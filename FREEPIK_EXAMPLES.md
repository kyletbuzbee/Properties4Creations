# Freepik API Integration Examples

Quick copy-paste examples for common use cases.

## 1. Add Images to Resources Page

**File:** `web/src/app/resources/page.tsx`

```typescript
import { getHousingImages } from '@/lib/freepik';
import Image from 'next/image';

export default async function ResourcesPage() {
  // Fetch housing images
  const affordableImages = await getHousingImages('affordable', 6);
  const veteranImages = await getHousingImages('veteran', 6);
  const familyImages = await getHousingImages('family', 6);

  return (
    <main className="min-h-screen bg-white">
      {/* Existing content */}
      
      {/* Add this section */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy mb-2">Housing Solutions</h2>
          <p className="text-lg text-slate-600 mb-8">
            Professional housing options for every need
          </p>

          {/* Affordable Housing Gallery */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-navy mb-6">
              Affordable Housing Communities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {affordableImages.map((image) => (
                <div 
                  key={image.id} 
                  className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={image.preview.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <p className="text-white font-semibold">{image.title}</p>
                    <p className="text-gray-200 text-sm">by {image.creator.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Veteran Housing Gallery */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-navy mb-6">
              Veteran Housing Programs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {veteranImages.map((image) => (
                <div 
                  key={image.id} 
                  className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={image.preview.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <p className="text-white font-semibold">{image.title}</p>
                    <p className="text-gray-200 text-sm">by {image.creator.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family Housing Gallery */}
          <div>
            <h3 className="text-2xl font-semibold text-navy mb-6">
              Family Housing Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {familyImages.map((image) => (
                <div 
                  key={image.id} 
                  className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={image.preview.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <p className="text-white font-semibold">{image.title}</p>
                    <p className="text-gray-200 text-sm">by {image.creator.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## 2. Interactive Gallery Component

**File:** `web/src/app/projects/page.tsx` (or any client component)

```typescript
'use client';

import { FreepikImageGallery } from '@/components/FreepikImageGallery';
import { useState } from 'react';
import type { FreepikImage } from '@/lib/freepik';

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<FreepikImage | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-navy mb-4">Housing Projects</h1>
        <p className="text-lg text-slate-600 mb-12">
          Browse our collection of housing solutions and projects
        </p>

        {/* Gallery */}
        <FreepikImageGallery
          query="housing project renovation community"
          limit={12}
          columns={4}
          onSelectImage={setSelectedImage}
          className="mb-12"
        />

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="bg-slate-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-navy mb-4">Project Details</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img
                  src={selectedImage.preview.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-sm text-sage font-semibold mb-2">Featured Project</p>
                  <h3 className="text-3xl font-bold text-navy mb-4">{selectedImage.title}</h3>
                  <p className="text-slate-600 mb-4">
                    High-quality image showcasing modern housing solutions
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Creator</p>
                    <a 
                      href={selectedImage.creator.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage hover:underline"
                    >
                      {selectedImage.creator.name}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">License</p>
                    <p className="text-slate-900">
                      {selectedImage.license.type === 'free' ? '🆓 Free' : '⭐ Premium'}
                    </p>
                  </div>
                  <a
                    href={selectedImage.resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage/90 transition-colors"
                  >
                    View Full Resolution
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
```

---

## 3. Dynamic Hero with Random Image

**File:** `web/src/app/page.tsx` (home page)

```typescript
import { searchFreepikImages } from '@/lib/freepik';
import Image from 'next/image';

export default async function HomePage() {
  // Get random hero image
  const heroResults = await searchFreepikImages({
    query: 'veteran housing support community affordable homes',
    limit: 3,
    filters: {
      license: 'free',
      orientation: 'horizontal',
    },
  });

  const heroImage = heroResults.data?.[0];

  return (
    <main className="min-h-screen">
      {/* Hero Section with Dynamic Image */}
      <section className="relative h-96 overflow-hidden bg-navy">
        {heroImage && (
          <Image
            src={heroImage.preview.url}
            alt="Housing Solutions"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Affordable Housing Solutions
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl">
            Supporting veterans and families with safe, affordable housing
          </p>
          <button className="bg-sage hover:bg-sage/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Get Started Today
          </button>
        </div>
        
        {/* Photo Credit */}
        {heroImage && (
          <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs p-2">
            Photo by {heroImage.creator.name}
          </div>
        )}
      </section>

      {/* Rest of home page content */}
    </main>
  );
}
```

---

## 4. Insights Page with Article Cover Images

**File:** `web/src/app/insights/page.tsx`

```typescript
import { searchFreepikImages } from '@/lib/freepik';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  searchQuery: string;
  date: string;
}

const articles: Article[] = [
  {
    slug: 'affordable-housing-strategies',
    title: 'Affordable Housing Strategies',
    excerpt: 'Exploring effective approaches to housing affordability',
    searchQuery: 'affordable housing community development strategy',
    date: '2025-11-15',
  },
  {
    slug: 'veteran-housing-programs',
    title: 'Veteran Housing Programs',
    excerpt: 'Government and non-profit support for veterans',
    searchQuery: 'veteran housing support community program',
    date: '2025-11-10',
  },
  {
    slug: 'housing-market-trends',
    title: 'Housing Market Trends 2025',
    excerpt: 'What to expect in the housing market this year',
    searchQuery: 'modern housing market trends development',
    date: '2025-11-05',
  },
];

export default async function InsightsPage() {
  // Fetch images for each article
  const articlesWithImages = await Promise.all(
    articles.map(async (article) => {
      try {
        const results = await searchFreepikImages({
          query: article.searchQuery,
          limit: 1,
          filters: { license: 'free' },
        });
        return {
          ...article,
          image: results.data[0],
        };
      } catch (error) {
        console.error(`Error fetching image for ${article.slug}:`, error);
        return { ...article, image: null };
      }
    })
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-navy mb-4">Housing Insights</h1>
        <p className="text-lg text-slate-600 mb-12">
          Latest articles and updates on affordable housing
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesWithImages.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group"
            >
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {/* Article Image */}
                {article.image ? (
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <Image
                      src={article.image.preview.url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-r from-sage to-teal flex items-center justify-center text-white text-center px-4">
                    <p>{article.title}</p>
                  </div>
                )}

                {/* Article Info */}
                <div className="p-6">
                  <time className="text-sm text-slate-500">{article.date}</time>
                  <h3 className="text-xl font-bold text-navy mt-2 mb-3 group-hover:text-sage transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{article.excerpt}</p>

                  {/* Creator Credit */}
                  {article.image && (
                    <p className="mt-4 text-xs text-slate-500">
                      Photo by {article.image.creator.name}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

---

## 5. Reusable Image Section Component

**File:** `web/src/components/HousingImageSection.tsx`

```typescript
import { getHousingImages } from '@/lib/freepik';
import Image from 'next/image';

interface HousingImageSectionProps {
  category: 'affordable' | 'veteran' | 'family' | 'modern' | 'community' | 'section8' | 'renovation' | 'construction' | 'interior' | 'exterior';
  title: string;
  description?: string;
  limit?: number;
  columns?: number;
}

export async function HousingImageSection({
  category,
  title,
  description,
  limit = 6,
  columns = 3,
}: HousingImageSectionProps) {
  const images = await getHousingImages(category, limit);

  if (images.length === 0) {
    return null;
  }

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns] || 'grid-cols-3';

  return (
    <section className="py-12 bg-gradient-to-r from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-navy mb-2">{title}</h2>
        {description && (
          <p className="text-lg text-slate-600 mb-8">{description}</p>
        )}

        <div className={`grid ${gridClass} gap-6`}>
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={image.preview.url}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white font-semibold">{image.title}</p>
                <p className="text-gray-200 text-sm">by {image.creator.name}</p>
                <a
                  href={image.resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sage hover:text-sage/80 text-sm font-medium"
                >
                  View on Freepik →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Usage:**

```typescript
import { HousingImageSection } from '@/components/HousingImageSection';

export default function MyPage() {
  return (
    <div>
      <HousingImageSection
        category="affordable"
        title="Affordable Housing Solutions"
        description="Explore our collection of affordable housing communities"
        limit={6}
        columns={3}
      />
      
      <HousingImageSection
        category="veteran"
        title="Veteran Support Programs"
        limit={4}
        columns={4}
      />
    </div>
  );
}
```

---

## 6. Error Handling Pattern

```typescript
'use client';

import { useFreepikImages } from '@/hooks/useFreepikImages';

export function SafeImageGallery({ query }: { query: string }) {
  const { images, loading, error, hasMore, loadMore } = useFreepikImages(query);

  return (
    <div className="space-y-4">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="font-semibold text-red-900">Failed to Load Images</h3>
          <p className="text-red-700 text-sm">{error.message}</p>
          <p className="text-red-600 text-xs mt-2">
            Please try again later or contact support
          </p>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative h-48 overflow-hidden rounded-lg">
              <img src={image.preview.url} alt={image.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* No Results State */}
      {!loading && !error && images.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-600">No images found for "{query}"</p>
          <p className="text-slate-500 text-sm">Try a different search term</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-sage text-white px-6 py-2 rounded-lg hover:bg-sage/90 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Images'}
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## Tips & Tricks

### 1. Optimize Image Loading
```typescript
// Use next/image for best performance
import Image from 'next/image';

<Image
  src={image.preview.url}
  alt={image.title}
  width={800}
  height={600}
  className="object-cover"
/>
```

### 2. Cache Images Locally
```typescript
const cache = useFreepikImageCache();
cache.setCached(image.id, image.preview.url);

// Later retrieve
const cached = cache.getCachedUrl(image.id);
```

### 3. Use Multiple Categories
```typescript
const [affordable, veteran, family] = await Promise.all([
  getHousingImages('affordable', 4),
  getHousingImages('veteran', 4),
  getHousingImages('family', 4),
]);
```

### 4. Attribution Best Practice
```typescript
<div className="text-xs text-gray-600">
  Photo by{' '}
  <a href={image.creator.url} target="_blank" rel="noopener noreferrer">
    {image.creator.name}
  </a>
  {' • '}
  {image.license.type === 'free' ? 'Free License' : 'Premium License'}
</div>
```

---

**Pick an example, copy it to your page, and deploy!** 🚀
