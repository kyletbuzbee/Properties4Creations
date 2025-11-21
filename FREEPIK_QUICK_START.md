# Freepik API - Quick Start Implementation

## What's Been Set Up

✅ **API Credentials Configured**
- API Key: `FPSX8d4383d88de2e9613dff11eac835e90a`
- Webhook ID: `d8099d7b0aa2d0be7b2e13e4ab7f9bc6`
- Stored securely in `.env.local`

✅ **Core Integration Created**
- `/src/lib/freepik.ts` - API communication layer
- `/src/hooks/useFreepikImages.ts` - React client hooks
- `/src/components/FreepikImageGallery.tsx` - Gallery component
- `/src/app/api/freepik/search` - Server endpoint (30 requests/min rate limit)
- `/src/app/api/freepik/webhook` - Webhook handler for notifications

✅ **Build Status**
- All 23 pages building successfully
- No errors or type issues
- Ready for deployment

---

## Immediate Next Steps (30 Minutes)

### Option 1: Add to Resources Page (Easiest - 10 minutes)

Edit `web/src/app/resources/page.tsx`:

```typescript
import { getHousingImages } from '@/lib/freepik';
import Image from 'next/image';

// Add this inside your resources section
const affordableImages = await getHousingImages('affordable', 6);

// Then add to your JSX:
<section className="py-12">
  <h3 className="mb-8 text-2xl font-bold">Featured Housing Examples</h3>
  <div className="grid grid-cols-3 gap-6">
    {affordableImages.map((image) => (
      <div key={image.id} className="relative h-64 overflow-hidden rounded-lg">
        <Image
          src={image.preview.url}
          alt={image.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
          <p className="text-sm text-white">{image.title}</p>
        </div>
      </div>
    ))}
  </div>
</section>
```

### Option 2: Add Gallery Component (Interactive - 15 minutes)

Create a new page or section:

```typescript
'use client';

import { FreepikImageGallery } from '@/components/FreepikImageGallery';

export function ImageSearchSection() {
  return (
    <div className="py-12">
      <FreepikImageGallery
        query="affordable housing community"
        limit={12}
        columns={3}
        onSelectImage={(image) => {
          console.log('Selected:', image);
          // Do something with selected image
        }}
      />
    </div>
  );
}
```

### Option 3: Add Hero Images (Dynamic - 20 minutes)

```typescript
// web/src/app/page.tsx - Add to home page

import { searchFreepikImages } from '@/lib/freepik';
import Image from 'next/image';

export default async function HomePage() {
  // Get random hero image
  const heroSearch = await searchFreepikImages({
    query: 'veteran housing support community',
    limit: 3,
  });

  const heroImage = heroSearch.data[0];

  return (
    <div className="relative h-96 overflow-hidden rounded-xl">
      {heroImage && (
        <Image
          src={heroImage.preview.url}
          alt="Housing Solutions"
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">
          Affordable Housing Solutions
        </h1>
      </div>
    </div>
  );
}
```

---

## Available Housing Categories

Pre-configured for easy use:

```typescript
import { getHousingImages } from '@/lib/freepik';

// Each returns up to 6 professional housing images
await getHousingImages('affordable');        // Affordable housing community
await getHousingImages('veteran');           // Veteran support housing
await getHousingImages('family');            // Family home affordable
await getHousingImages('modern');            // Modern affordable housing
await getHousingImages('community');         // Community housing development
await getHousingImages('section8');          // Housing assistance program
await getHousingImages('renovation');        // Home renovation affordable
await getHousingImages('construction');      // Affordable housing construction
await getHousingImages('interior');          // Modern interior affordable home
await getHousingImages('exterior');          // New house exterior
```

---

## Testing the Integration

### Test Search API

```bash
curl -X POST http://localhost:3000/api/freepik/search \
  -H "Content-Type: application/json" \
  -d '{"query": "affordable housing", "limit": 5}'
```

### Test Webhook Status

```bash
curl http://localhost:3000/api/freepik/webhook
```

### Test in Component

```typescript
'use client';

import { useFreepikImages } from '@/hooks/useFreepikImages';

export function TestComponent() {
  const { images, loading, error } = useFreepikImages('housing');

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {images.length > 0 && (
        <div>
          Found {images.length} images
          {images.map(img => (
            <img key={img.id} src={img.preview.url} alt={img.title} />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Usage Examples by Page

### 1. **Resources Page** - Static Housing Categories

```typescript
import { getHousingImages } from '@/lib/freepik';

export default async function ResourcesPage() {
  const [affordable, veteran, family] = await Promise.all([
    getHousingImages('affordable', 4),
    getHousingImages('veteran', 4),
    getHousingImages('family', 4),
  ]);

  return (
    <div className="space-y-12">
      <ImageSection title="Affordable Housing Solutions" images={affordable} />
      <ImageSection title="Veteran Housing Programs" images={veteran} />
      <ImageSection title="Family Housing Opportunities" images={family} />
    </div>
  );
}
```

### 2. **Projects Page** - Interactive Gallery

```typescript
'use client';

import { FreepikImageGallery } from '@/components/FreepikImageGallery';
import { useState } from 'react';

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <FreepikImageGallery
        query="housing project renovation"
        columns={4}
        onSelectImage={setSelectedImage}
      />
      {selectedImage && (
        <div className="mt-8 p-6 bg-slate-100 rounded">
          <h3>Selected Project Image</h3>
          <img src={selectedImage.preview.url} alt={selectedImage.title} />
        </div>
      )}
    </div>
  );
}
```

### 3. **Insights Page** - Article Cover Images

```typescript
import { searchFreepikImages } from '@/lib/freepik';

export default async function InsightsPage() {
  const articles = [
    { slug: 'affordable-solutions', query: 'affordable housing solutions' },
    { slug: 'market-trends', query: 'housing market trends' },
    { slug: 'veteran-support', query: 'veteran community support' },
  ];

  const articlesWithImages = await Promise.all(
    articles.map(async (article) => {
      const results = await searchFreepikImages({
        query: article.query,
        limit: 1,
      });
      return {
        ...article,
        image: results.data[0],
      };
    })
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      {articlesWithImages.map((article) => (
        <article key={article.slug}>
          {article.image && (
            <Image
              src={article.image.preview.url}
              alt={article.image.title}
              width={400}
              height={250}
              className="rounded"
            />
          )}
          <h3>{article.slug}</h3>
        </article>
      ))}
    </div>
  );
}
```

---

## API Reference Quick Lookup

### Server-Side (Recommended)

```typescript
// Import
import { 
  searchFreepikImages,      // Search with filters
  getFreepikImage,          // Get specific image
  getHousingImages,         // Predefined housing categories
  validateFreepikApiKey,    // Check API configuration
} from '@/lib/freepik';

// Usage
const results = await searchFreepikImages({
  query: 'housing',
  limit: 20,
  offset: 0,
  filters: {
    license: 'free',
    orientation: 'horizontal',
  },
});

const image = await getFreepikImage('image-id');
```

### Client-Side

```typescript
// Import
import { useFreepikImages, useFreepikImageCache } from '@/hooks/useFreepikImages';
import { FreepikImageGallery } from '@/components/FreepikImageGallery';

// Usage
const { images, loading, error, loadMore, hasMore } = useFreepikImages('housing');

const cache = useFreepikImageCache();
cache.setCached('image-id', 'url');
const cached = cache.getCachedUrl('image-id');
```

### API Endpoint

```bash
POST /api/freepik/search
{
  "query": "affordable housing",
  "limit": 20,
  "offset": 0,
  "filters": {
    "license": "free",
    "orientation": "horizontal"
  }
}

GET /api/freepik/webhook  # Check webhook status
```

---

## Best Practices

### 1. **Image Optimization**
```typescript
import Image from 'next/image';

// Always use Next.js Image component
<Image
  src={image.preview.url}
  alt={image.title}
  width={1200}
  height={800}
  className="object-cover"
/>
```

### 2. **Attribution**
```typescript
// Always credit creator
<div className="text-sm text-gray-600">
  Photo by {image.creator.name}
  {image.license.type === 'premium' && ' (Premium License)'}
</div>
```

### 3. **Error Handling**
```typescript
try {
  const images = await getHousingImages('affordable');
  // Use images
} catch (error) {
  console.error('Failed to load images:', error);
  // Show fallback UI
}
```

### 4. **Caching**
```typescript
// Server-side: Cache for 1 hour
import { cachedSearchFreepikImages } from '@/lib/freepik';
const results = await cachedSearchFreepikImages({...});

// Client-side: Use localStorage cache
const cache = useFreepikImageCache();
```

---

## Common Patterns

### Pattern 1: Static Image Section
```typescript
// Use on server component for best performance
const images = await getHousingImages('category');
```

### Pattern 2: Dynamic Search
```typescript
// Use on client component for interactivity
const { images } = useFreepikImages(userQuery);
```

### Pattern 3: Gallery with Selection
```typescript
// Use component for complete UI
<FreepikImageGallery
  query="housing"
  onSelectImage={handleSelect}
/>
```

### Pattern 4: Hero with Random Image
```typescript
// Use for dynamic hero sections
const [image] = await searchFreepikImages({
  query: 'hero keyword',
  limit: 1,
});
```

---

## Deployment Checklist

- [ ] Test local build: `npm run build`
- [ ] Test search endpoint: `POST /api/freepik/search`
- [ ] Add images to at least one page
- [ ] Verify images load in production
- [ ] Check GitHub Pages deployment
- [ ] Monitor webhook for events

---

## Rate Limits & Quotas

- **Search API:** 30 requests per minute per IP
- **Images per request:** Max 100
- **Free license images:** Unlimited
- **Premium images:** Depends on Freepik account

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API returns 401 | Check API key in `.env.local` |
| Images not loading | Test with `npm run dev`, check browser console |
| Rate limit exceeded | Wait 60 seconds before retry |
| Webhook not working | Check domain is publicly accessible |

---

## Next Phase Ideas

1. **Image Management Dashboard**
   - Save favorite images
   - Create collections
   - Track usage

2. **Automated Image Refresh**
   - Daily image updates
   - Trending categories
   - Seasonal content

3. **Advanced Features**
   - Image cropping tool
   - Batch downloads
   - Image analytics
   - A/B testing images

---

**Ready to implement!** Choose an option above and start adding professional housing images to your pages.

**Questions?** Check `FREEPIK_INTEGRATION_GUIDE.md` for detailed documentation.
