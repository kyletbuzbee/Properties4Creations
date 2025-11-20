// Performance monitoring utilities for Core Web Vitals and custom metrics

export interface WebVitalsMetric {
  name: string
  value: number
  id: string
  timestamp?: number
}

export interface PerformanceObserverEntry extends PerformanceEntry {
  processingStart?: number
  loadEventStart?: number
  loadEventEnd?: number
  domInteractive?: number
  domContentLoadedEventStart?: number
  domContentLoadedEventEnd?: number
  domComplete?: number
  firstPaint?: number
  firstContentfulPaint?: number
  largestContentfulPaint?: number
  firstInputDelay?: number
  cumulativeLayoutShift?: number
  hadRecentInput?: boolean
}

// Core Web Vitals tracking
export function trackWebVitals(onPerfEntry?: (metric: WebVitalsMetric) => void) {
  if (typeof window === 'undefined') return

  // CLS - Cumulative Layout Shift
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0
        let sessionEntries: PerformanceObserverEntry[] = []

        for (const entry of entryList.getEntries() as PerformanceObserverEntry[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.cumulativeLayoutShift || 0
            sessionEntries.push(entry)
          }
        }

        // Send CLS score when page becomes hidden or after a timeout
        if (clsValue > 0) {
          sendToAnalytics({
            name: 'CLS',
            value: clsValue,
            id: 'v3-cls-' + Date.now(),
          })
          onPerfEntry?.({
            name: 'CLS',
            value: clsValue,
            id: 'v3-cls-' + Date.now(),
          })
        }
      })

      clsObserver.observe({ type: 'layout-shift', buffered: true })
    } catch (e) {
      console.warn('Layout Shift observer not supported')
    }

    // LCP - Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceObserverEntry

        if (lastEntry) {
          sendToAnalytics({
            name: 'LCP',
            value: lastEntry.startTime,
            id: 'v3-lcp-' + Date.now(),
          })
          onPerfEntry?.({
            name: 'LCP',
            value: lastEntry.startTime,
            id: 'v3-lcp-' + Date.now(),
          })
        }
      })

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch (e) {
      console.warn('LCP observer not supported')
    }

    // FID - First Input Delay
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const firstInputEntry = entry as PerformanceObserverEntry
          const inputDelay = firstInputEntry.processingStart! - entry.startTime

          sendToAnalytics({
            name: 'FID',
            value: inputDelay,
            id: 'v3-fid-' + Date.now(),
          })
          onPerfEntry?.({
            name: 'FID',
            value: inputDelay,
            id: 'v3-fid-' + Date.now(),
          })
        }
      })

      fidObserver.observe({ type: 'first-input', buffered: true })
    } catch (e) {
      console.warn('FID observer not supported')
    }

    // FCP - First Contentful Paint (also available natively)
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          sendToAnalytics({
            name: 'FCP',
            value: entry.startTime,
            id: 'v3-fcp-' + Date.now(),
          })
          onPerfEntry?.({
            name: 'FCP',
            value: entry.startTime,
            id: 'v3-fcp-' + Date.now(),
          })
        }
      })

      fcpObserver.observe({ type: 'paint', buffered: true })
    } catch (e) {
      // Fallback to Performance API
      if ('performance' in window && 'getEntriesByType' in window.performance) {
        const paintEntries = window.performance.getEntriesByType('paint')
        paintEntries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            sendToAnalytics({
              name: 'FCP',
              value: entry.startTime,
              id: 'v3-fcp-' + Date.now(),
            })
          }
        })
      }
    }
  }
}

// Send performance metrics to analytics
function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    })
  }

  // Send to service worker for offline storage/processing
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'performance',
      payload: metric,
    })
  }

  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${metric.name}: ${metric.value}ms`)
  }
}

// Additional performance utilities
export function measureTimeToInteractive() {
  if (typeof window === 'undefined') return

  if ('performance' in window) {
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    if (navigation) {
      const tti = navigation.domInteractive - navigation.fetchStart
      sendToAnalytics({
        name: 'TTI',
        value: tti,
        id: 'tti-' + Date.now(),
      })
    }
  }
}

export function measureTimeToFirstByte() {
  if (typeof window === 'undefined') return

  if ('performance' in window) {
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart
      sendToAnalytics({
        name: 'TTFB',
        value: ttfb,
        id: 'ttfb-' + Date.now(),
      })
    }
  }
}

export function trackPageLoadTime() {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    if ('performance' in window) {
      const loadTime = window.performance.now()
      sendToAnalytics({
        name: 'PageLoad',
        value: loadTime,
        id: 'load-' + Date.now(),
      })
    }
  })
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // Start tracking Core Web Vitals
  trackWebVitals()

  // Track additional metrics
  measureTimeToFirstByte()
  trackPageLoadTime()

  // Track navigation timing when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      measureTimeToInteractive()
    })
  } else {
    measureTimeToInteractive()
  }
}
