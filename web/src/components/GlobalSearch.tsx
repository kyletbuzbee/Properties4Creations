'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  type: 'project' | 'resource' | 'page';
  url: string;
  description?: string;
  tags?: string[];
  location?: string;
  price?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Command+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // This would be handled by parent component
        }
      }

      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }

      // Navigate results
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => prev <= 0 ? results.length - 1 : prev - 1);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
          e.preventDefault();
          window.location.href = results[selectedIndex].url;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex]);

  // Search logic
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      const searchTerm = query.toLowerCase();

      // Mock search results - replace with real search logic
      const mockResults: SearchResult[] = [
        // Projects
        {
          id: '1',
          title: 'Downtown Austin Renovation',
          type: 'project',
          url: '/projects/downtown-austin-renovation',
          description: 'Modern 2BR apartment in downtown Austin',
          tags: ['Section 8', 'Veteran Priority'],
          location: 'Downtown Austin',
          price: '$1,200/month'
        },
        {
          id: '2',
          title: 'South Congress Lofts',
          type: 'project',
          url: '/projects/south-congress-lofts',
          description: 'Historic building converted to modern lofts',
          tags: ['Market Rate', 'Pet Friendly'],
          location: 'South Congress',
          price: '$1,800/month'
        },
        // Resources
        {
          id: '3',
          title: 'Section 8 Voucher Guide',
          type: 'resource',
          url: '/resources/section8',
          description: 'Complete guide to Section 8 housing vouchers'
        },
        {
          id: '4',
          title: 'Fair Market Rent Calculator',
          type: 'resource',
          url: '/resources/voucher-calculator',
          description: 'Calculate your potential housing assistance'
        },
        // Pages
        {
          id: '5',
          title: 'About Properties 4 Creation',
          type: 'page',
          url: '/about',
          description: 'Our mission and values'
        },
        {
          id: '6',
          title: 'Contact Us',
          type: 'page',
          url: '/contact',
          description: 'Get in touch with our team'
        }
      ];

      // Filter results based on search term
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(searchTerm) ||
        result.description?.toLowerCase().includes(searchTerm) ||
        result.location?.toLowerCase().includes(searchTerm) ||
        result.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );

      // Sort by relevance (title matches first, then description)
      filteredResults.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
        const bTitleMatch = b.title.toLowerCase().includes(searchTerm);

        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;

        return 0;
      });

      // Limit to top 8 results
      setResults(filteredResults.slice(0, 8));

      setTimeout(() => {
        setLoading(false);
      }, 200); // Simulate network delay
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'project':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'resource':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'page':
        return (
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'project': return 'Project';
      case 'resource': return 'Resource';
      case 'page': return 'Page';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-[10vh] z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <svg className="absolute left-3 top-3 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties, resources, and pages..."
              className="w-full pl-10 pr-4 py-3 text-lg border-0 focus:ring-0 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-2 flex items-center text-xs text-slate-500">
            <span>Press </span>
            <kbd className="mx-1 px-2 py-1 bg-slate-100 rounded text-xs font-mono">↑↓</kbd>
            <span> to navigate, </span>
            <kbd className="mx-1 px-2 py-1 bg-slate-100 rounded text-xs font-mono">enter</kbd>
            <span> to select, </span>
            <kbd className="mx-1 px-2 py-1 bg-slate-100 rounded text-xs font-mono">esc</kbd>
            <span> to close</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-slate-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-navy mx-auto mb-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div ref={resultsRef}>
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className={`flex items-start gap-3 p-4 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 ${
                    index === selectedIndex ? 'bg-slate-50' : ''
                  }`}
                  onClick={onClose}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-brand-navy truncate">
                        {result.title}
                      </h3>
                      <span className="text-xs text-slate-400 ml-2 flex-shrink-0">
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    {result.description && (
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                    {(result.location || result.price) && (
                      <div className="flex items-center gap-4 mt-2">
                        {result.location && (
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {result.location}
                          </div>
                        )}
                        {result.price && (
                          <div className="text-xs font-medium text-brand-navy">
                            {result.price}
                          </div>
                        )}
                      </div>
                    )}
                    {result.tags && result.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {result.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {result.tags.length > 3 && (
                          <span className="text-xs text-slate-400">
                            +{result.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-600 mb-2">No results found</h3>
              <p className="text-slate-500">
                Try adjusting your search terms or browse our <Link href="/projects" className="text-brand-navy hover:underline">projects</Link> and <Link href="/resources" className="text-brand-navy hover:underline">resources</Link>.
              </p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-600 mb-2">Start typing to search</h3>
              <p className="text-slate-500">
                Search for properties, housing resources, and site pages
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
