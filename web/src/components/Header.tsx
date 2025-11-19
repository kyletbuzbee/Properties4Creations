import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Properties 4 Creation</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
          <Link href="/projects" className="hover:text-blue-200 transition-colors">Our Work</Link>
          <Link href="/resources" className="hover:text-blue-200 transition-colors">For Veterans</Link>
          <Link href="/about" className="hover:text-blue-200 transition-colors">About Us</Link>
          <Link href="/get-started" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">Get Involved</Link>
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
