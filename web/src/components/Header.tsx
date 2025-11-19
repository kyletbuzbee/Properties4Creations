'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'Our Work', href: '/projects', current: pathname === '/projects' },
    { name: 'For Veterans', href: '/resources', current: pathname === '/resources' },
    { name: 'About Us', href: '/about', current: pathname === '/about' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-white shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-lg">P4</span>
          </div>
          <Link href="/" className="text-xl font-bold hover:text-slate-200 transition-colors duration-200">
            Properties 4 Creation
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                item.current
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'text-slate-200 hover:text-white hover:bg-navy-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:transform hover:scale-105"
          >
            Get Involved
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md text-slate-200 hover:text-white hover:bg-navy-600 transition-colors duration-200"
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

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'max-h-96 opacity-100 visible translate-y-0'
            : 'max-h-0 opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="px-4 py-6 bg-navy-800 border-t border-navy-600">
          <div className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  item.current
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-200 hover:text-white hover:bg-navy-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg mt-4"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
