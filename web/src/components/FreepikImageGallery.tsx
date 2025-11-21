/**
 * FreepikImageGallery - React component for displaying Freepik images
 */

'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useFreepikImages, useFreepikImageCache } from '@/hooks/useFreepikImages';
import type { FreepikImage } from '@/lib/freepik';

interface FreepikImageGalleryProps {
  query: string;
  limit?: number;
  columns?: number;
  onSelectImage?: (image: FreepikImage) => void;
  className?: string;
}

export function FreepikImageGallery({
  query,
  limit = 12,
  columns = 3,
  onSelectImage,
  className = '',
}: FreepikImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<FreepikImage | null>(null);
  const { images, loading, error, hasMore, totalResults, loadMore } = useFreepikImages(query, {
    limit,
    autoFetch: true,
  });

  const cache = useFreepikImageCache();

  const handleSelectImage = useCallback(
    (image: FreepikImage) => {
      setSelectedImage(image);
      cache.setCached(image.id, image.preview.url);
      onSelectImage?.(image);
    },
    [cache, onSelectImage]
  );

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns] || 'grid-cols-3';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Image Gallery</h3>
          <p className="text-sm text-slate-600">
            {totalResults > 0
              ? `Found ${totalResults} images for "${query}"`
              : loading
                ? 'Searching...'
                : 'No images found'}
          </p>
        </div>
        {loading && (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-sage border-t-transparent" />
            <span className="text-sm text-slate-600">Loading...</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            Error loading images: {error.message}
          </p>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className={`grid gap-4 ${gridColsClass}`}>
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => handleSelectImage(image)}
              className={`group relative overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage?.id === image.id
                  ? 'border-sage shadow-lg'
                  : 'border-slate-200 hover:border-sage hover:shadow-md'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={image.preview.url}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 transform p-3 transition-transform group-hover:translate-y-0">
                  <p className="truncate text-xs font-medium text-white">{image.title}</p>
                  <p className="text-xs text-gray-200">
                    by {image.creator.name}
                  </p>
                </div>
              </div>

              {/* License Badge */}
              <div className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white">
                {image.license.type === 'free' ? '🆓 Free' : '⭐ Premium'}
              </div>

              {/* Selection Checkmark */}
              {selectedImage?.id === image.id && (
                <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-sage">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-lg bg-sage px-6 py-2 text-white transition-colors hover:bg-sage/90 disabled:opacity-50"
          >
            {loading ? 'Loading more...' : 'Load more images'}
          </button>
        </div>
      )}

      {/* No Images State */}
      {!loading && images.length === 0 && !error && (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-600">No images found for "{query}"</p>
          <p className="text-sm text-slate-500">Try a different search query</p>
        </div>
      )}

      {/* Selected Image Details */}
      {selectedImage && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h4 className="font-semibold text-slate-900">Selected Image</h4>
          <div className="mt-2 space-y-1 text-sm">
            <p>
              <span className="font-medium text-slate-600">Title:</span>{' '}
              {selectedImage.title}
            </p>
            <p>
              <span className="font-medium text-slate-600">Creator:</span>{' '}
              <a
                href={selectedImage.creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:underline"
              >
                {selectedImage.creator.name}
              </a>
            </p>
            <p>
              <span className="font-medium text-slate-600">License:</span>{' '}
              {selectedImage.license.type === 'free' ? '🆓 Free' : '⭐ Premium'}
            </p>
            <p>
              <span className="font-medium text-slate-600">Dimensions:</span>{' '}
              {selectedImage.preview.width} × {selectedImage.preview.height}
            </p>
            <a
              href={selectedImage.resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded bg-sage px-4 py-2 text-white transition-colors hover:bg-sage/90"
            >
              View on Freepik
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default FreepikImageGallery;
