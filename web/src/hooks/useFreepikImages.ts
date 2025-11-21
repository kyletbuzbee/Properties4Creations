/**
 * React hooks for Freepik API integration
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import type { FreepikImage, FreepikSearchParams } from '@/lib/freepik';

interface UseFreepikImagesState {
  images: FreepikImage[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  totalResults: number;
}

interface UseFreepikImagesOptions {
  autoFetch?: boolean;
  limit?: number;
}

/**
 * Hook for searching Freepik images
 * Note: This should be used with server actions due to API key security
 */
export function useFreepikImages(
  initialQuery: string,
  options: UseFreepikImagesOptions = {}
) {
  const { autoFetch = true, limit = 20 } = options;
  const [state, setState] = useState<UseFreepikImagesState>({
    images: [],
    loading: false,
    error: null,
    hasMore: false,
    totalResults: 0,
  });
  const [offset, setOffset] = useState(0);

  const searchImages = useCallback(async (query: string, pageOffset: number = 0) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Call server action instead of direct API call
      const response = await fetch('/api/freepik/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          limit,
          offset: pageOffset,
          filters: {
            license: 'free',
            orientation: 'horizontal',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      setState((prev) => ({
        ...prev,
        images: pageOffset === 0 ? data.data : [...prev.images, ...data.data],
        hasMore: data.data.length === limit,
        totalResults: data.meta?.pagination?.total || 0,
        loading: false,
      }));

      setOffset(pageOffset + limit);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Unknown error'),
        loading: false,
      }));
    }
  }, [limit]);

  useEffect(() => {
    if (autoFetch && initialQuery) {
      searchImages(initialQuery, 0);
    }
  }, [initialQuery, autoFetch, searchImages]);

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      searchImages(initialQuery, offset);
    }
  }, [initialQuery, offset, state.loading, state.hasMore, searchImages]);

  const reset = useCallback(() => {
    setState({
      images: [],
      loading: false,
      error: null,
      hasMore: false,
      totalResults: 0,
    });
    setOffset(0);
  }, []);

  return {
    ...state,
    searchImages,
    loadMore,
    reset,
  };
}

/**
 * Hook for caching image URLs locally
 */
export function useFreepikImageCache() {
  const cacheKey = 'freepik_image_cache';

  const getCached = useCallback(() => {
    try {
      const cached = localStorage?.getItem(cacheKey);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  }, []);

  const setCached = useCallback((imageId: string, imageUrl: string) => {
    try {
      const cache = getCached();
      cache[imageId] = {
        url: imageUrl,
        timestamp: Date.now(),
      };
      localStorage?.setItem(cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.error('Error caching image:', error);
    }
  }, [getCached]);

  const getCachedUrl = useCallback((imageId: string) => {
    const cache = getCached();
    return cache[imageId]?.url || null;
  }, [getCached]);

  const clearCache = useCallback(() => {
    try {
      localStorage?.removeItem(cacheKey);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }, []);

  return {
    getCached,
    setCached,
    getCachedUrl,
    clearCache,
  };
}
