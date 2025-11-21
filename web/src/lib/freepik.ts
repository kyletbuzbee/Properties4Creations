/**
 * Freepik API Integration Module
 * Handles image search, retrieval, and management via Freepik API
 */

import { cache } from 'react';

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_API_BASE = 'https://api.freepik.com/v1';
const FREEPIK_WEBHOOK_ID = process.env.FREEPIK_WEBHOOK_ID;

// Types for Freepik API responses
export interface FreepikSearchParams {
  query: string;
  limit?: number;
  offset?: number;
  filters?: {
    license?: 'free' | 'premium';
    category?: string;
    color?: string;
    orientation?: 'horizontal' | 'vertical' | 'square';
  };
}

export interface FreepikImage {
  id: string;
  title: string;
  url: string;
  preview: {
    url: string;
    width: number;
    height: number;
  };
  resource: {
    type: 'photo' | 'vector' | 'psd' | 'ai';
    url: string;
  };
  creator: {
    name: string;
    url: string;
  };
  license: {
    type: 'free' | 'premium';
    text: string;
  };
}

export interface FreepikSearchResponse {
  data: FreepikImage[];
  meta: {
    pagination: {
      limit: number;
      offset: number;
      total: number;
    };
  };
}

/**
 * Search for images on Freepik
 */
export async function searchFreepikImages(
  params: FreepikSearchParams
): Promise<FreepikSearchResponse> {
  if (!FREEPIK_API_KEY) {
    throw new Error('Freepik API key not configured');
  }

  const searchParams = new URLSearchParams({
    query: params.query,
    limit: String(params.limit || 20),
    offset: String(params.offset || 0),
  });

  // Add optional filters
  if (params.filters?.license) {
    searchParams.append('license', params.filters.license);
  }
  if (params.filters?.orientation) {
    searchParams.append('orientation', params.filters.orientation);
  }
  if (params.filters?.color) {
    searchParams.append('color', params.filters.color);
  }

  try {
    const response = await fetch(`${FREEPIK_API_BASE}/resources?${searchParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-freepik-api-key': FREEPIK_API_KEY,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Freepik API authentication failed');
      }
      if (response.status === 429) {
        throw new Error('Freepik API rate limit exceeded');
      }
      throw new Error(`Freepik API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as FreepikSearchResponse;
  } catch (error) {
    console.error('Freepik API search error:', error);
    throw error;
  }
}

/**
 * Get image details by ID
 */
export async function getFreepikImage(imageId: string): Promise<FreepikImage> {
  if (!FREEPIK_API_KEY) {
    throw new Error('Freepik API key not configured');
  }

  try {
    const response = await fetch(`${FREEPIK_API_BASE}/resources/${imageId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-freepik-api-key': FREEPIK_API_KEY,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image details: ${response.statusText}`);
    }

    const data = await response.json();
    return data as FreepikImage;
  } catch (error) {
    console.error('Freepik API get image error:', error);
    throw error;
  }
}

/**
 * Search with caching for React Server Components
 */
export const cachedSearchFreepikImages = cache(
  async (params: FreepikSearchParams) => {
    return searchFreepikImages(params);
  }
);

/**
 * Get image with caching for React Server Components
 */
export const cachedGetFreepikImage = cache(async (imageId: string) => {
  return getFreepikImage(imageId);
});

/**
 * Popular search queries for housing/property content
 */
export const HOUSING_SEARCH_QUERIES = {
  affordable: 'affordable housing community',
  veteran: 'veteran support housing',
  family: 'family home affordable',
  modern: 'modern affordable housing',
  community: 'community housing development',
  section8: 'housing assistance program',
  renovation: 'home renovation affordable',
  construction: 'affordable housing construction',
  interior: 'modern interior affordable home',
  exterior: 'new house exterior',
};

/**
 * Get images for specific categories
 */
export async function getHousingImages(
  category: keyof typeof HOUSING_SEARCH_QUERIES,
  limit: number = 6
): Promise<FreepikImage[]> {
  try {
    const query = HOUSING_SEARCH_QUERIES[category];
    const response = await cachedSearchFreepikImages({
      query,
      limit,
      filters: {
        license: 'free',
        orientation: 'horizontal',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} images:`, error);
    return [];
  }
}

/**
 * Download image (for server-side operations)
 */
export async function downloadFreepikImage(
  imageUrl: string,
  filename: string
): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    // Note: Actual file system operations should be done on the server
    // This is a placeholder for the HTTP fetch
    console.log(`Downloaded image from Freepik: ${filename}`);
    return true;
  } catch (error) {
    console.error('Error downloading Freepik image:', error);
    return false;
  }
}

/**
 * Validate API key configuration
 */
export async function validateFreepikApiKey(): Promise<boolean> {
  if (!FREEPIK_API_KEY) {
    console.warn('Freepik API key not configured');
    return false;
  }

  try {
    const response = await fetch(`${FREEPIK_API_BASE}/resources?query=test&limit=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-freepik-api-key': FREEPIK_API_KEY,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Freepik API validation error:', error);
    return false;
  }
}

/**
 * Get webhook ID for Freepik notifications
 */
export function getFreepikWebhookId(): string | undefined {
  return FREEPIK_WEBHOOK_ID;
}
