import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// React import for client-side hooks (not using hooks yet, just for React.ReactNode)
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Temporarily disable service worker and useEffect hooks that might be failing
  // useEffect(() => {
  //   initPerformanceMonitoring();
  // }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Properties 4 Creation - Working Layout</title>
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
