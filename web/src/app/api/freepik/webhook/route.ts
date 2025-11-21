/**
 * Freepik Webhook Handler
 * Receives notifications from Freepik API (e.g., image ready, license changes)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFreepikWebhookId } from '@/lib/freepik';

interface WebhookPayload {
  event: string;
  timestamp: string;
  data: Record<string, unknown>;
}

/**
 * Verify webhook signature (if needed)
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) {
    console.warn('No webhook signature provided');
    return false;
  }

  // Implement signature verification based on Freepik's signing method
  // This is a placeholder - check Freepik documentation for actual implementation
  try {
    const crypto = require('crypto');
    const hash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    return hash === signature;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Handle different webhook events
 */
async function handleWebhookEvent(event: WebhookPayload): Promise<void> {
  const { event: eventType, data, timestamp } = event;

  console.log(`[${timestamp}] Freepik webhook event: ${eventType}`, data);

  switch (eventType) {
    case 'image.ready':
      await handleImageReady(data);
      break;

    case 'image.license_changed':
      await handleLicenseChanged(data);
      break;

    case 'download.started':
      await handleDownloadStarted(data);
      break;

    case 'download.completed':
      await handleDownloadCompleted(data);
      break;

    case 'quota.warning':
      await handleQuotaWarning(data);
      break;

    default:
      console.warn(`Unknown webhook event type: ${eventType}`);
  }
}

/**
 * Handle image.ready event
 */
async function handleImageReady(data: Record<string, unknown>): Promise<void> {
  console.log('Image ready for download:', data);
  // Update database, trigger processing, etc.
}

/**
 * Handle image.license_changed event
 */
async function handleLicenseChanged(data: Record<string, unknown>): Promise<void> {
  console.log('Image license changed:', data);
  // Update image metadata in database
}

/**
 * Handle download.started event
 */
async function handleDownloadStarted(data: Record<string, unknown>): Promise<void> {
  console.log('Download started:', data);
  // Track download metrics
}

/**
 * Handle download.completed event
 */
async function handleDownloadCompleted(data: Record<string, unknown>): Promise<void> {
  console.log('Download completed:', data);
  // Update download status, trigger next steps
}

/**
 * Handle quota.warning event
 */
async function handleQuotaWarning(data: Record<string, unknown>): Promise<void> {
  console.error('API quota warning:', data);
  // Alert administrators, implement throttling
}

export async function POST(request: NextRequest) {
  try {
    // Get webhook secret from environment
    const webhookSecret = process.env.FREEPIK_WEBHOOK_SECRET || 'default-secret';

    // Get signature from headers
    const signature = request.headers.get('x-freepik-signature');

    // Get request body as text for signature verification
    const bodyText = await request.text();

    // Verify signature (optional but recommended)
    // Uncomment when Freepik signature verification is implemented
    // if (!verifyWebhookSignature(bodyText, signature, webhookSecret)) {
    //   console.warn('Invalid webhook signature');
    //   return NextResponse.json(
    //     { error: 'Invalid signature' },
    //     { status: 401 }
    //   );
    // }

    // Parse JSON payload
    const payload: WebhookPayload = JSON.parse(bodyText);

    // Validate required fields
    if (!payload.event || !payload.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle the webhook event
    await handleWebhookEvent(payload);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Webhook processed successfully',
        eventId: payload.event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Return webhook status
  const webhookId = getFreepikWebhookId();

  return NextResponse.json(
    {
      status: 'active',
      webhookId,
      message: 'Freepik webhook endpoint is ready to receive events',
    },
    { status: 200 }
  );
}
