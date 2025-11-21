# Freepik API Integration Guide

## Overview

The Properties 4 Creation platform now includes full integration with the **Freepik API** for accessing professional housing and property images, illustrations, and design assets.

**API Key:** `FPSX8d4383d88de2e9613dff11eac835e90a`  
**Webhook ID:** `d8099d7b0aa2d0be7b2e13e4ab7f9bc6`

---

## Configuration

### Environment Variables

The Freepik API credentials are stored in `.env.local`:

```env
# Freepik API Configuration
FREEPIK_API_KEY=FPSX8d4383d88de2e9613dff11eac835e90a
FREEPIK_WEBHOOK_ID=d8099d7b0aa2d0be7b2e13e4ab7f9bc6
NEXT_PUBLIC_FREEPIK_ENABLED=true
```

**Note:** Keep `FREEPIK_API_KEY` secret - it should only be used on the server side.

---

## API Modules

### 1. Core Library (`/src/lib/freepik.ts`)

The main integration module providing:

#### Functions

**`searchFreepikImages(params)`**
- Search for images on Freepik
- Parameters:
  - `query` (string): Search term
  - `limit` (number, default: 20): Results per page
  - `offset` (number, default: 0): Pagination offset
  - `filters` (object): Filter by license, orientation, color
- Returns: Promise<FreepikSearchResponse>

**Example:**
```typescript
import { searchFreepikImages } from '@/lib/freepik';

const results = await searchFreepikImages({
  query: 'affordable housing',
  limit: 12,
  filters: {
    license: 'free',
    orientation: 'horizontal',
  },
});
```

**`getFreepikImage(imageId)`**
- Get detailed information about a specific image
- Parameters:
  - `imageId` (string): Freepik image ID
- Returns: Promise<FreepikImage>

**`getHousingImages(category, limit)`**
- Get images for specific housing-related categories
- Categories: `affordable`, `veteran`, `family`, `modern`, `community`, `section8`, `renovation`, `construction`, `interior`, `exterior`
- Returns: Promise<FreepikImage[]>

**Example:**
```typescript
const affordableImages = await getHousingImages('affordable', 6);
```

**`validateFreepikApiKey()`**
- Verify API key is valid
- Returns: Promise<boolean>

#### Caching

Both functions have cached versions for React Server Components:

```typescript
import { cachedSearchFreepikImages, cachedGetFreepikImage } from '@/lib/freepik';

const results = await cachedSearchFreepikImages({...});
const image = await cachedGetFreepikImage(imageId);
```

---

### 2. React Hooks (`/src/hooks/useFreepikImages.ts`)

Client-side hooks for working with Freepik images:

**`useFreepikImages(query, options)`**
- Hook for searching and managing images in React components
- Options:
  - `autoFetch` (boolean, default: true): Auto-fetch on mount
  - `limit` (number, default: 20): Results per page
- Returns: Object with:
  - `images`: FreepikImage[]
  - `loading`: boolean
  - `error`: Error | null
  - `hasMore`: boolean
  - `totalResults`: number
  - `searchImages()`: Manual search function
  - `loadMore()`: Load next page
  - `reset()`: Clear results

**Example:**
```typescript
'use client';

import { useFreepikImages } from '@/hooks/useFreepikImages';

export function ImageSearch() {
  const { images, loading, error, loadMore, hasMore } = useFreepikImages('modern housing', {
    autoFetch: true,
    limit: 12,
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="grid">
        {images.map(img => (
          <img key={img.id} src={img.preview.url} alt={img.title} />
        ))}
      </div>
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
}
```

**`useFreepikImageCache()`**
- Local caching hook for reducing API calls
- Methods:
  - `getCached()`: Get all cached images
  - `setCached(imageId, url)`: Cache image URL
  - `getCachedUrl(imageId)`: Get cached URL
  - `clearCache()`: Clear local cache

---

### 3. API Routes

#### Search Endpoint: `POST /api/freepik/search`

Server-side image search endpoint for secure API key handling.

**Request Body:**
```json
{
  "query": "affordable housing",
  "limit": 20,
  "offset": 0,
  "filters": {
    "license": "free",
    "orientation": "horizontal"
  }
}
```

**Response:**
```json
{
  "data": [
    {
      "id": "image-id",
      "title": "Modern affordable housing",
      "url": "https://...",
      "preview": {
        "url": "https://...",
        "width": 1200,
        "height": 800
      },
      "resource": {
        "type": "photo",
        "url": "https://freepik.com/..."
      },
      "creator": {
        "name": "Creator Name",
        "url": "https://freepik.com/creator"
      },
      "license": {
        "type": "free",
        "text": "Freepik License"
      }
    }
  ],
  "meta": {
    "pagination": {
      "limit": 20,
      "offset": 0,
      "total": 150
    }
  }
}
```

**Error Responses:**
- `400`: Invalid query parameters
- `401`: API authentication failed
- `429`: Rate limit exceeded (30 requests/minute)
- `503`: API not configured

**Usage from Client:**
```typescript
const response = await fetch('/api/freepik/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'affordable housing',
    limit: 20,
  }),
});

const data = await response.json();
```

#### Webhook Endpoint: `POST /api/freepik/webhook`

Receives notifications from Freepik API.

**Webhook Events:**
- `image.ready`: Image processing complete
- `image.license_changed`: License status updated
- `download.started`: Download initiated
- `download.completed`: Download finished
- `quota.warning`: API quota warning

**GET Status:**
```
GET /api/freepik/webhook
```
Returns webhook status and configuration.

---

## React Component

### FreepikImageGallery Component

Pre-built gallery component for displaying Freepik images:

```typescript
import { FreepikImageGallery } from '@/components/FreepikImageGallery';

export function PropertyGallery() {
  return (
    <FreepikImageGallery
      query="affordable housing"
      limit={12}
      columns={3}
      onSelectImage={(image) => {
        console.log('Selected:', image);
      }}
    />
  );
}
```

**Props:**
- `query` (string): Search query
- `limit` (number, default: 12): Results per page
- `columns` (number, default: 3): Grid columns (1-4)
- `onSelectImage` (function): Callback when image selected
- `className` (string): Additional CSS classes

**Features:**
- Image preview grid
- Hover effects with title overlay
- License badges (Free/Premium)
- Selection checkmarks
- Creator attribution
- Load more pagination
- Image details panel
- Direct link to Freepik

---

## Page Integration Examples

### 1. Resources Page with Housing Images

```typescript
// web/src/app/resources/page.tsx

import { getHousingImages } from '@/lib/freepik';
import Image from 'next/image';

export default async function ResourcesPage() {
  const affordableImages = await getHousingImages('affordable', 6);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Affordable Housing</h2>
        <div className="grid grid-cols-3 gap-4">
          {affordableImages.map((image) => (
            <div key={image.id} className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src={image.preview.url}
                alt={image.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                <p className="text-sm font-medium text-white">{image.title}</p>
                <p className="text-xs text-gray-200">by {image.creator.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

### 2. Hero Image with Freepik

```typescript
// Use dynamic images from Freepik for hero sections

import { searchFreepikImages } from '@/lib/freepik';
import Image from 'next/image';

export default async function HomePage() {
  const heroImages = await searchFreepikImages({
    query: 'veteran housing support',
    limit: 1,
    filters: { license: 'free', orientation: 'horizontal' },
  });

  const heroImage = heroImages.data[0];

  return (
    <div className="relative h-96 w-full overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.preview.url}
          alt="Housing"
          fill
          className="object-cover"
          priority
        />
      )}
      {/* Content overlay */}
    </div>
  );
}
```

### 3. Before/After Gallery

```typescript
// web/src/app/projects/page.tsx

'use client';

import { FreepikImageGallery } from '@/components/FreepikImageGallery';
import { useState } from 'react';
import type { FreepikImage } from '@/lib/freepik';

export default function ProjectsPage() {
  const [before, setBefore] = useState<FreepikImage | null>(null);
  const [after, setAfter] = useState<FreepikImage | null>(null);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="mb-4 text-lg font-bold">Before Images</h3>
        <FreepikImageGallery
          query="old house renovation before"
          onSelectImage={setBefore}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-bold">After Images</h3>
        <FreepikImageGallery
          query="modern home renovation after"
          onSelectImage={setAfter}
        />
      </div>
    </div>
  );
}
```

---

## Rate Limiting

The API enforces **30 requests per minute** per client IP to prevent abuse.

- Handled automatically by the server-side route
- Returns `429 Too Many Requests` if exceeded
- Rate limit is per IP address

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid API key | Check `.env.local` configuration |
| `429 Too Many Requests` | Rate limit exceeded | Wait 60 seconds before retrying |
| `503 Service Unavailable` | API not configured | Verify `FREEPIK_API_KEY` is set |
| `400 Bad Request` | Invalid query | Ensure query is 2-100 characters |

### Error Handling in Components

```typescript
'use client';

import { useFreepikImages } from '@/hooks/useFreepikImages';

export function SafeGallery() {
  const { images, error, loading } = useFreepikImages('housing');

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">Failed to load images</p>
        <p className="text-sm text-red-600">{error.message}</p>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;

  if (images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img) => (
        <img key={img.id} src={img.preview.url} alt={img.title} />
      ))}
    </div>
  );
}
```

---

## Best Practices

### 1. Caching
- Use cached versions in Server Components
- Use `useFreepikImageCache()` hook on client
- Cache headers set to 1 hour for API responses

### 2. Performance
- Use `limit` parameter to control results (20-30 optimal)
- Implement pagination with `loadMore()`
- Load images lazily with `next/image`

### 3. Attribution
- Always display creator name and link
- Show license type (Free/Premium)
- Link to resource on Freepik

### 4. Content Selection
- Use specific housing-related queries
- Filter by `license: 'free'` to avoid premium content
- Use `orientation: 'horizontal'` for hero images

### 5. Error Recovery
- Implement fallback UI
- Retry failed requests with exponential backoff
- Log errors for monitoring

---

## Troubleshooting

### Images Not Loading
1. Check API key in `.env.local`
2. Verify internet connection
3. Test with `/api/freepik/search` endpoint
4. Check browser console for errors

### Webhook Not Receiving Events
1. Verify webhook endpoint is accessible: `https://properties4creations.com/api/freepik/webhook`
2. Check Freepik webhook configuration
3. Review server logs for incoming requests

### Performance Issues
- Reduce `limit` parameter
- Enable image caching
- Use Next.js Image Optimization
- Implement CDN caching

---

## Monitoring

### Health Check

```bash
curl -X GET https://properties4creations.com/api/freepik/webhook
```

Should return:
```json
{
  "status": "active",
  "webhookId": "d8099d7b0aa2d0be7b2e13e4ab7f9bc6",
  "message": "Freepik webhook endpoint is ready to receive events"
}
```

### API Validation

```bash
curl -X POST https://properties4creations.com/api/freepik/search \
  -H "Content-Type: application/json" \
  -d '{"query": "housing", "limit": 5}'
```

---

## Next Steps

1. **Integrate into existing pages:**
   - Resources page with housing category images
   - Projects page with before/after galleries
   - Insights page with article cover images

2. **Create image management dashboard:**
   - Save favorite images
   - Manage collections
   - Download tracking

3. **Implement auto-refresh:**
   - Periodic image updates
   - Trending images
   - Seasonal content

4. **Advanced features:**
   - Custom image filters
   - Image cropping tools
   - Batch downloads
   - Image analytics

---

## Support

For issues or questions:
- Check Freepik API documentation: https://freepik.com/api/
- Review server logs
- Test endpoints individually
- Contact Freepik support with webhook ID: `d8099d7b0aa2d0be7b2e13e4ab7f9bc6`

---

**Last Updated:** November 21, 2025  
**Status:** Ready for integration  
**API Version:** Freepik v1
