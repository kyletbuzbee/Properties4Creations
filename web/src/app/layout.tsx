import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Fair market value housing solutions in East Texas. Section 8 ready homes, veteran priority, transparent pricing with no hidden fees." />
        <meta name="keywords" content="East Texas housing, affordable homes, Section 8, veterans housing, fair pricing" />
        <meta name="author" content="Properties 4 Creation" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Properties 4 Creation - East Texas Family Housing" />
        <meta property="og:description" content="Discover fair market value housing in East Texas. Section 8 ready homes for families and veterans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://properties4creations.com" />
        <meta property="og:image" content="/images/hero/housing-hero.webp" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Properties 4 Creation - East Texas Family Housing" />
        <meta name="twitter:description" content="Fair market value housing with Section 8 support and veteran priority" />
        <meta name="twitter:image" content="/images/hero/housing-hero.webp" />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//firebaseio.com" />
        <link rel="dns-prefetch" href="//google-analytics.com" />

        <title>Properties 4 Creation - East Texas Family Housing</title>
      </head>
      <body className="antialiased bg-white text-gray-900">
        <ClientInitializer />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
