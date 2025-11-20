'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Mock article data - replace with real CMS data
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  category: string;
  tags: string[];
  published_at: string;
  reading_time: number;
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
}

const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'housing-market-recovery-2024',
    title: 'Navigating the 2024 Housing Market Recovery: Opportunities for Veterans',
    excerpt: 'An analysis of current housing market trends and how they impact first-time buyers, with special considerations for veterans seeking affordable housing options.',
    author: 'Sarah Johnson',
    category: 'Market Analysis',
    tags: ['housing market', 'veterans', 'affordable housing', 'market trends'],
    published_at: '2024-11-15',
    reading_time: 5,
    featured_image: '/api/placeholder/800/400',
    seo_title: '2024 Housing Market Recovery for Veterans | Properties 4 Creation',
    seo_description: 'Learn how veterans can take advantage of the recovering housing market with Section 8 vouchers and affordable housing options.'
  },
  {
    id: '2',
    slug: 'section-8-program-updates',
    title: 'HUD Announces Major Section 8 Program Updates for 2025',
    excerpt: 'Breaking down the latest changes to the Section 8 voucher program that could impact thousands of renters and housing providers across Texas.',
    author: 'Michael Chen',
    category: 'Policy Updates',
    tags: ['section 8', 'HUD', 'policy changes', 'texas housing'],
    published_at: '2024-11-10',
    reading_time: 4,
    featured_image: '/api/placeholder/800/400',
    seo_title: '2025 Section 8 Program Updates | Latest HUD Changes',
    seo_description: 'Stay informed about the latest Section 8 voucher program changes from HUD that affect Texas renters and property owners.'
  },
  {
    id: '3',
    slug: 'veteran-housing-strategies',
    title: 'Strategic Approaches to Veteran Housing: Beyond Section 8',
    excerpt: 'Exploring alternative housing solutions and support programs specifically designed to address the unique challenges faced by veteran homeowners.',
    author: 'Dr. Robert Williams',
    category: 'Veteran Support',
    tags: ['veterans', 'housing assistance', 'VA loans', 'homeownership'],
    published_at: '2024-11-05',
    reading_time: 6,
    featured_image: '/api/placeholder/800/400',
    seo_title: 'Advanced Veteran Housing Strategies | VA Programs & Support',
    seo_description: 'Discover comprehensive housing strategies for veterans including VA loans, down payment assistance, and specialized housing programs.'
  },
  {
    id: '4',
    slug: 'energy-efficient-renovations',
    title: 'The Business Case for Energy-Efficient Property Renovations',
    excerpt: 'How modern renovation techniques can increase property values, reduce operating costs, and qualify properties for additional rental assistance programs.',
    author: 'Jennifer Martinez',
    category: 'Property Management',
    tags: ['energy efficiency', 'property renovations', 'cost savings', 'rental assistance'],
    published_at: '2024-10-28',
    reading_time: 7,
    featured_image: '/api/placeholder/800/400',
    seo_title: 'Energy-Efficient Renovations ROI | Property Investment Strategy',
    seo_description: 'Learn how energy-efficient renovations can improve property value, reduce costs, and qualify for additional housing assistance programs.'
  },
  {
    id: '5',
    slug: 'rental-property-tax-changes',
    title: '2024 Rental Property Tax Landscape: What Investors Need to Know',
    excerpt: 'A comprehensive guide to recent tax law changes affecting rental property investors, including deductions, credits, and compliance requirements.',
    author: 'David Thompson',
    category: 'Investment Guide',
    tags: ['tax planning', 'rental income', 'investment strategy', 'tax deductions'],
    published_at: '2024-10-20',
    reading_time: 8,
    featured_image: '/api/placeholder/800/400',
    seo_title: '2024 Rental Property Tax Changes for Investors',
    seo_description: 'Understand the latest tax law changes affecting rental property investments and how to optimize your tax strategy for maximum returns.'
  },
  {
    id: '6',
    slug: 'smart-home-features-veterans',
    title: 'Accessible Smart Home Features: Supporting Independent Living for Veterans',
    excerpt: 'Modern smart home technologies that can significantly improve accessibility and independence for veterans with disabilities or mobility challenges.',
    author: 'Lisa Anderson',
    category: 'Technology',
    tags: ['smart homes', 'accessibility', 'veterans', 'technology', 'independent living'],
    published_at: '2024-10-12',
    reading_time: 5,
    featured_image: '/api/placeholder/800/400',
    seo_title: 'Accessible Smart Home Technology for Veterans',
    seo_description: 'Explore smart home technologies that enhance accessibility and independent living for veterans with disabilities.'
  }
];

const categories = [
  'All',
  'Market Analysis',
  'Policy Updates',
  'Veteran Support',
  'Property Management',
  'Investment Guide',
  'Technology'
];

const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Housing Insights & <span className="text-brand-beige">News</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Stay informed with expert analysis, market trends, and policy updates in veteran housing,
              affordable rental programs, and property investment strategies.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <svg className="absolute left-3 top-3 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 text-slate-900 focus:ring-2 focus:ring-brand-beige"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-brand-beige text-brand-navy'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2-5H7a2 2 0 00-2 2v10a2 2 0 002 2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 001.707-.707V7.414A2.414 2.414 0 0017.586 5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                No articles found
              </h3>
              <p className="text-slate-500 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-brand-navy text-white px-6 py-2 rounded-lg hover:bg-brand-navy/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <div className="mb-16">
                  <div className="bg-white rounded-xl shadow-card overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="aspect-[4/3] bg-slate-200 relative">
                          {featuredArticle.featured_image && (
                            <Image
                              src={featuredArticle.featured_image}
                              alt={featuredArticle.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-brand-navy text-white rounded-full capitalize">
                            Featured
                          </span>
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-brand-beige text-brand-navy rounded-full">
                            {featuredArticle.category}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4 leading-tight">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center text-white font-medium">
                              {featuredArticle.author.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{featuredArticle.author}</p>
                              <p className="text-sm text-slate-500">{featuredArticle.reading_time} min read</p>
                            </div>
                          </div>
                          <Link
                            href={`/insights/${featuredArticle.slug}`}
                            className="px-6 py-3 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors font-semibold"
                          >
                            Read Article →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.slice(1).map((article) => (
                  <article key={article.id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card/80 transition-shadow group">
                    <Link href={`/insights/${article.slug}`}>
                      <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
                        {article.featured_image && (
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-brand-beige/20 text-brand-navy rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-slate-500">{article.reading_time} min read</span>
                        </div>
                        <h3 className="text-lg font-bold text-brand-navy mb-3 line-clamp-2 group-hover:text-brand-navy/80 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{article.author}</span>
                          <time className="text-xs text-slate-500">
                            {new Date(article.published_at).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-brand-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay In The Know</h2>
          <p className="text-xl mb-8 text-slate-200 max-w-2xl mx-auto">
            Get the latest housing market insights, policy updates, and veteran housing opportunities
            delivered directly to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-brand-navy focus:ring-2 focus:ring-brand-beige"
              />
              <button className="px-6 py-3 bg-brand-beige text-brand-navy rounded-lg hover:bg-brand-beige/90 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InsightsPage;
