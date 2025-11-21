'use client';
import Link from 'next/link';

export default function ModernHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col lg:flex-row">
      {/* LEFT: Seller/Donor Focus (Navy Theme) */}
      <div className="flex-1 bg-brand-navy flex items-center justify-center p-8 md:p-16 lg:p-20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('/assets/patio_wood.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-105"/>
        <div className="relative z-10 max-w-md animate-fade-in-left">
          <span className="inline-block py-1 px-3 rounded-full bg-red-600/20 text-red-200 border border-red-500/30 text-xs font-bold tracking-wider mb-4">
            FOR PROPERTY OWNERS
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Transform your property into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">legacy.</span>
          </h1>
          <p className="text-slate-300 mb-8 text-lg">
            Get a fair cash offer or donate your property. We renovate it to house veterans in need.
          </p>
          <Link href="/get-started?type=seller" className="inline-flex items-center bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-900/50 hover:scale-105">
            Get Cash Offer →
          </Link>
        </div>
      </div>

      {/* RIGHT: Housing Solutions (Warm Sand Theme) */}
      <div className="flex-1 bg-brand-sand flex items-center justify-center p-8 md:p-16 lg:p-20 relative group border-l border-slate-200">
        <div className="relative z-10 max-w-md animate-fade-in-right">
          <span className="inline-block py-1 px-3 rounded-full bg-white text-brand-cocoa border border-brand-cocoa/30 text-xs font-bold tracking-wider mb-4">
            QUALITY + AFFORDABLE
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-navy mb-6 leading-tight">
            Quality housing at <span className="text-brand-cocoa">accessible rates</span> for all qualified renters.
          </h1>
          <p className="text-slate-700 mb-8 text-lg">
            Section 8 voucher assistance available. Veteran priority placement honored. We provide professionally renovated homes that meet HUD standards and fit within your rental assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/projects" className="inline-flex items-center bg-brand-navy hover:bg-brand-navy/90 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105">
              View Available Properties
            </Link>
            <Link href="/resources/voucher-calculator" className="inline-flex items-center text-brand-navy hover:bg-brand-navy hover:text-white font-semibold px-4 py-4 border border-brand-navy rounded-lg hover:shadow-lg transition-all">
              Calculate Rental Assistance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
