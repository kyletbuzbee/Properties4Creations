import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://properties4creations.com'),

  title: {
    default: 'Properties 4 Creation - East Texas Family Housing',
    template: '%s | Properties 4 Creation'
  },

  description: 'Discover fair market value housing in East Texas. Section 8 ready homes for families and veterans. No hidden fees, transparent pricing, veteran priority housing.',

  keywords: [
    'East Texas housing',
    'Tyler Texas homes',
    'Longview Texas rentals',
    'Section 8 housing',
    'Veteran housing',
    'Family rentals',
    'Fair market housing',
    'Rent homes Texas',
    'Section 8 rentals',
    'TX veteran housing'
  ],

  authors: [{ name: 'Properties 4 Creation' }],

  creator: 'Properties 4 Creation',

  publisher: 'Properties 4 Creation',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  manifest: '/manifest.json',

  // Robozziza
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Properties 4 Creation',
    title: 'Properties 4 Creation - East Texas Family Housing',
    description: 'Discover fair market value housing in East Texas. Section 8 ready homes for families and veterans.',
    images: [
      {
        url: '/images/hero/housing-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Beautiful East Texas family housing',
      },
      {
        url: '/images/logo/p4c-logo.webp',
        width: 800,
        height: 800,
        alt: 'Properties 4 Creation Logo',
      },
    ],
  },

  // Twitter/X
  twitter: {
    card: 'summary_large_image',
    site: '@properties4c',
    creator: '@properties4c',
    title: 'Properties 4 Creation - East Texas Family Housing',
    description: 'Discover fair market value housing in East Texas. Section 8 ready homes for families and veterans.',
    images: ['/images/hero/housing-hero.webp'],
  },

  // Additional metadata
  category: 'real estate',
  classification: 'Real Estate Services',

  // Apple/iOS metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Properties 4 Creation',
  },

  // Windows MS Application
  other: {
    'msapplication-TileColor': '#1e293b',
    'msapplication-config': '/browserconfig.xml',
  },

  // Alternative descriptions for different regions
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
};

// Export page-specific metadata builders
export const buildPropertyMetadata = (property: {
  title: string;
  address: string;
  description: string;
  imageWebp?: string;
  imageJpg?: string;
}): Metadata => ({
  title: `${property.title} - ${property.address} | Properties 4 Creation`,

  description: property.description,

  openGraph: {
    title: `${property.title} in ${property.address}`,
    description: property.description,
    images: property.imageWebp ? [
      {
        url: property.imageWebp,
        width: 1200,
        height: 630,
        alt: property.title,
      }
    ] : undefined,
    type: 'article',
  },

  twitter: {
    card: 'summary_large_image',
    title: `${property.title} in ${property.address}`,
    description: property.description,
    images: property.imageWebp ? [property.imageWebp] : undefined,
  },
});

export const buildBlogMetadata = (post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  author: string;
  featuredImageWebp?: string;
}): Metadata => ({
  title: `${post.title} | Properties 4 Creation Blog`,

  description: post.excerpt,

  openGraph: {
    title: post.title,
    description: post.excerpt,
    type: 'article',
    publishedTime: post.publishedAt,
    authors: [post.author],
    images: post.featuredImageWebp ? [
      {
        url: post.featuredImageWebp,
        width: 1200,
        height: 630,
        alt: post.title,
      }
    ] : undefined,
  },

  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt,
    images: post.featuredImageWebp ? [post.featuredImageWebp] : undefined,
  },

  // Article-specific metadata
  other: {
    'article:published_time': post.publishedAt,
    'article:author': post.author,
    'article:section': 'Housing Insights',
  },
});
