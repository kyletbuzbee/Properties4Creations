/**
 * API route for Freepik image search
 * Server-side to keep API key secure
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchFreepikImages, validateFreepikApiKey } from '@/lib/freepik';
import type { FreepikSearchParams } from '@/lib/freepik';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiting helper
 */
function checkRateLimit(clientId: string, limit: number = 30, window: number = 60000): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(clientId);

  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(clientId, { count: 1, resetTime: now + window });
    return true;
  }

  if (existing.count < limit) {
    existing.count++;
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key first
    const isValid = await validateFreepikApiKey();
    if (!isValid) {
      return NextResponse.json(
        { error: 'Freepik API not configured or invalid' },
        { status: 503 }
      );
    }

    // Get client identifier for rate limiting
    const clientId = request.ip || 'unknown';

    // Check rate limit (30 requests per minute)
    if (!checkRateLimit(clientId, 30, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Maximum 30 requests per minute.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { query, limit = 20, offset = 0, filters } = body as FreepikSearchParams;

    // Validate query
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required and must be a string' },
        { status: 400 }
      );
    }

    if (query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (query.length > 100) {
      return NextResponse.json(
        { error: 'Query must be less than 100 characters' },
        { status: 400 }
      );
    }

    // Validate limit
    const validLimit = Math.min(Math.max(parseInt(String(limit), 10) || 20, 1), 100);

    // Call Freepik API
    const result = await searchFreepikImages({
      query,
      limit: validLimit,
      offset: Math.max(parseInt(String(offset), 10) || 0, 0),
      filters,
    });

    // Return successful response
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Freepik API error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('authentication')) {
        return NextResponse.json(
          { error: 'Authentication failed with Freepik API' },
          { status: 401 }
        );
      }

      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Freepik API rate limit exceeded' },
          { status: 429 }
        );
      }

      if (error.message.includes('not configured')) {
        return NextResponse.json(
          { error: 'Freepik API not configured' },
          { status: 503 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to search images. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Redirect GET to POST or return error
  return NextResponse.json(
    { error: 'Use POST method to search images' },
    { status: 405 }
  );
}
