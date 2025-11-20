'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MegaMenu from './MegaMenu';
import DarkModeToggle from './DarkModeToggle';
import UserPortalDropdown from './UserPortalDropdown';
import GlobalSearch from './GlobalSearch';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null); // Mock user state
  const pathname = usePathname();

  // Global search keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMegaMenu = () => {
    setMegaMenuOpen(!megaMenuOpen);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  };

  const handleLogin = (type: 'partner' | 'veteran') => {
    // Mock login - replace with real auth
    setUser({ id: '1', type, name: `Test ${type}`, email: `${type}@example.com` });
  };

  const handleLogout = () => {
    setUser(null);
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
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-navy/95 text-white shadow-xl backdrop-blur-md border-b border-white/10'
          : 'bg-brand-navy text-white shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">P4</span>
              </div>
              <span className="text-xl font-bold group-hover:text-slate-200 transition-colors duration-200">
                Properties 4 Creation
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  item.current
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              title="Search (⌘K)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Services Mega Menu Button */}
            <button
              onClick={toggleMegaMenu}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 relative"
            >
              Services ▼
              {megaMenuOpen && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
              )}
            </button>

            {/* User Portal Dropdown */}
            <UserPortalDropdown
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            <Link
              href="/get-started"
              className="bg-gradient-cta text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-red-500/25"
            >
              Get Fair Offer
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
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
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? 'max-h-96 opacity-100 visible translate-y-0'
              : 'max-h-0 opacity-0 invisible -translate-y-2'
          }`}
        >
          <div className="px-4 py-6 bg-navy-800/50 border-t border-white/10 backdrop-blur-sm">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeAllMenus}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    item.current
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>


              <button
                onClick={() => {
                  setMegaMenuOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                Services ▼
              </button>
              <Link
                href="/get-started"
                onClick={closeAllMenus}
                className="block w-full text-center bg-gradient-cta hover:bg-gradient-cta/90 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg mt-4"
              >
                Get Fair Offer
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menu */}
      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      {/* Global Search Modal */}
      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default Header;
