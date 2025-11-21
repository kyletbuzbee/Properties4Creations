let withSentryConfig

try {
  withSentryConfig = require('@sentry/nextjs').withSentryConfig
} catch (error) {
  // Sentry not installed, use noop function
  withSentryConfig = (config) => config
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Firebase Hosting
  output: 'export',
  trailingSlash: true,

  // Compression and performance
  compress: true,

  // Image optimization for static export
  images: {
    domains: ['firebase.appspot.com', 'firebasestorage.googleapis.com', 'cloudinary.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Required for static export
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value:
              process.env.NODE_ENV === 'production'
                ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://*.firebaseio.com https://*.googleapis.com; frame-src https://www.google.com;"
                : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https:; img-src 'self' data: https:; connect-src 'self' https:; frame-src https:;",
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, no-cache, no-store',
          },
        ],
      },
    ]
  },

  // Next.js 15 experimental features for maximum performance (React 19 features removed for stability)
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      '@heroicons/react',
      'lucide-react',
      'react-hook-form',
      'zod'
    ],
  },
  // Build optimizations for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'] // Keep warnings in production for monitoring
    } : false,
  },

  // PWA readiness
  poweredByHeader: false,

  // Redirects for SEO and user experience
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Rewrites (if needed for API routes or dynamic routing)
  async rewrites() {
    return [
      // Example rewrite for API proxying if needed
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ]
  },
}

module.exports = process.env.SENTRY_DSN ? withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}) : nextConfig
