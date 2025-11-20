import { Metadata } from 'next'

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  structuredData?: object[]
}

export function generateMetadata(data: SEOMetadata): Metadata {
  const { title, description, keywords, ogImage, structuredData } = data

  const baseUrl = process.env.SITE_URL || 'https://properties4creation.com'
  const canonicalUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : baseUrl

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    authors: [{ name: 'Properties 4 Creation' }],
    creator: 'Properties 4 Creation',
    publisher: 'Properties 4 Creation',
    metadataBase: new URL(canonicalUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Properties 4 Creation',
      images: [
        {
          url: ogImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || '/og-image.jpg'],
      creator: '@properties4creation',
    },
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    // Add structured data
    other: {
      ...structuredData && { 'json-ld': JSON.stringify(structuredData) },
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Properties 4 Creation',
    description: 'Expert renovations and housing solutions for veterans. Get cash offers for properties and connect veterans with Section 8 eligible housing.',
    url: 'https://properties4creation.com',
    logo: 'https://properties4creation.com/logo.png',
    sameAs: [
      'https://facebook.com/properties4creation',
      'https://linkedin.com/company/properties4creation',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-512-555-0123',
      contactType: 'customer service',
      email: 'contact@properties4creation.com',
      availableLanguage: 'English',
      hoursAvailable: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      ],
    },
    areaServed: 'Austin, Texas',
    serviceType: ['Property Renovation', 'Housing Evaluation', 'Section 8 Support'],
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Properties 4 Creation',
    url: 'https://properties4creation.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://properties4creation.com/projects?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}
