'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
  featured?: boolean;
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:absolute lg:inset-auto lg:top-full lg:left-0 lg:right-0 lg:z-40">
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={onClose} />

      {/* Mega Menu Content */}
      <div className="relative bg-white shadow-2xl border-t border-gray-200 lg:rounded-b-xl lg:border lg:border-t-0 overflow-hidden max-h-screen lg:max-h-96">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Services Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-navy border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Services
              </h3>
              {[
                { name: 'Property Renovation', href: '/services#renovation', desc: 'Complete home transformations' },
                { name: 'Fair Cash Offers', href: '/get-started', desc: 'Competitive property evaluations', featured: true },
                { name: 'Section 8 Support', href: '/resources/section8', desc: 'Housing choice voucher assistance' },
                { name: 'Property Management', href: '/services#management', desc: 'Full-service property care' },
                { name: 'Investment Consulting', href: '/services#consulting', desc: 'Smart real estate decisions' }
              ].map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  onClick={onClose}
                  className={`block p-3 rounded-lg transition-all duration-300 hover:bg-brand-teal/10 hover:border-brand-teal border border-transparent ${service.featured ? 'bg-gradient-to-r from-brand-navy/10 to-brand-teal/10 border-brand-teal/30' : ''}`}
                >
                  <div className="font-semibold text-brand-navy">{service.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{service.desc}</div>
                  {service.featured && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-red text-white">
                      Popular
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Insights Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-navy border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Insights & Resources
              </h3>
              {[
                { name: 'Housing Insights', href: '/insights', desc: 'Market analysis & news', featured: true },
                { name: 'Section 8 Guide', href: '/resources/section8', desc: 'Complete voucher guide' },
                { name: 'Cost Calculator', href: '/resources/voucher-calculator', desc: 'Estimate savings' },
                { name: 'Property Search', href: '/projects?section8=true', desc: 'Find Section 8 homes' },
                { name: 'Contact Support', href: '/contact', desc: 'Free consultations' }
              ].map((resource, index) => (
                <Link
                  key={index}
                  href={resource.href}
                  onClick={onClose}
                  className={`block p-3 rounded-lg transition-all duration-300 hover:bg-brand-teal/10 hover:border-brand-teal border border-transparent ${resource.featured ? 'bg-gradient-to-r from-brand-navy/10 to-brand-teal/10 border-brand-teal/30' : ''}`}
                >
                  <div className="font-semibold text-brand-navy">{resource.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{resource.desc}</div>
                  {resource.featured && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-navy text-white">
                      New
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-navy border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Company
              </h3>
              {[
                { name: 'About Our Mission', href: '/about', desc: 'Our story & values' },
                { name: 'Our Projects', href: '/projects', desc: 'Property transformations' },
                { name: 'Partnerships', href: '/about#partners', desc: 'Veteran organizations' },
                { name: 'Get Started', href: '/get-started', desc: 'Free property evaluation' }
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="block p-3 rounded-lg transition-all duration-300 hover:bg-brand-teal/10 hover:border-brand-teal border border-transparent"
                >
                  <div className="font-semibold text-brand-navy">{item.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                </Link>
              ))}
            </div>

            {/* Featured CTA */}
            <div className="bg-gradient-to-br from-brand-navy to-brand-teal text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
              <p className="text-white/90 text-sm mb-4">
                Get a free property consultation and fair cash offer within hours.
              </p>
              <Link
                href="/get-started"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-white text-brand-navy px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </span>
                Get Fair Offer
                <span>→</span>
              </Link>
              <p className="text-white/80 text-xs mt-3 flex items-center gap-1">
                <span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span> No obligation • Same day response
              </p>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="tel:512-555-PROPERTY" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (512) 555-PROPERTY
              </a>
              <a href="mailto:support@properties4creation.com" className="hover:text-brand-teal transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                onClick={onClose}
                className="bg-brand-teal hover:bg-brand-teal/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
