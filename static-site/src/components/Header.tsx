import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Properties 4 Creations</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-blue-200 transition-colors">Home</a>
          <a href="/properties" className="hover:text-blue-200 transition-colors">Properties</a>
          <a href="/about" className="hover:text-blue-200 transition-colors">Our Mission</a>
          <a href="/contact" className="hover:text-blue-200 transition-colors">Get Involved</a>
          <a href="/apply" className="bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
            Apply Now
          </a>
        </nav>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
