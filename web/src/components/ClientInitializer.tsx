'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/utils/performance';

export default function ClientInitializer() {
  useEffect(() => {
    // Enable Core Web Vitals and performance monitoring
    initPerformanceMonitoring();

    // Log initialization in development
    if (process.env.NODE_ENV === 'development') {
      console.log('💡 P4C: Client-side initialization complete');
      console.log('📊 Performance monitoring: Active');
      console.log('🎯 Core Web Vitals: Tracking enabled');
    }
  }, []);

  return null;
}
