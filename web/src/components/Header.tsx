'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'Our Work', href: '/projects', current: pathname?.startsWith('/projects') },
    { name: 'Insights', href: '/insights', current: pathname?.startsWith('/insights') },
    { name: 'For Veterans', href: '/resources', current: pathname?.startsWith('/resources') },
    { name: 'About Us', href: '/about', current: pathname?.startsWith('/about') },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 transition-all duration-300 bg-brand-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-bold text-2xl hover:opacity-80 transition-opacity">
            P4C
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  item.current
                    ? 'bg-white/20 text-white'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - CTA and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/get-started"
              className="hidden lg:inline-block bg-gradient-cta text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-brand-navy/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-all ${
                    item.current
                      ? 'bg-white/20 text-white'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-gradient-cta text-white px-4 py-3 rounded-md font-semibold text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all mt-4"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
