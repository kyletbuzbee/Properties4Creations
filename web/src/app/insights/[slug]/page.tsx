import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    content: `
# Navigating the 2024 Housing Market Recovery: Opportunities for Veterans

The housing market continues to show signs of stabilization and potential recovery. For veterans seeking affordable housing options, this presents both opportunities and challenges that require careful navigation.

## Current Market Trends

After two turbulent years, housing prices have begun to moderate in many Texas markets. Key indicators show:
- Average home prices down 8.5% from peak levels
- Mortgage rates stabilizing around 6.8%
- Rental demand remaining strong in suburban areas
- Section 8 voucher availability improving

## Veteran-Specific Opportunities

Veterans have access to unique housing assistance programs that provide leverage in today's market:

### VA Loan Flexibility
The VA loan program continues to offer competitive terms:
- No down payment requirements
- Competitive closing costs
- Flexible debt-to-income ratios

### Section 8 Vouchers
Recent program updates have increased voucher availability:
- 15% increase in Texas voucher pool
- Enhanced landlord incentives
- Improved processing times

## Strategic Considerations

### Timing Your Purchase
- Monitor local market conditions
- Consider off-peak buying seasons
- Evaluate rental vs. ownership options

### Location Selection
- Focus on areas with high voucher acceptance
- Consider commute and lifestyle factors
- Research local veteran support services

## Conclusion

The 2024 housing market recovery offers veterans unprecedented opportunities when approached strategically. Understanding local market dynamics and leveraging available veteran-specific programs can significantly improve housing outcomes.
    `,
    author: 'Sarah Johnson',
    category: 'Market Analysis',
    tags: ['housing market', 'veterans', 'affordable housing', 'market trends'],
    published_at: '2024-11-15',
    reading_time: 5,
    featured_image: '/api/placeholder/1200/600',
    seo_title: '2024 Housing Market Recovery for Veterans | Properties 4 Creation',
    seo_description: 'Learn how veterans can take advantage of the recovering housing market with Section 8 vouchers and affordable housing options.'
  },
  {
    id: '2',
    slug: 'section-8-program-updates',
    title: 'HUD Announces Major Section 8 Program Updates for 2025',
    excerpt: 'Breaking down the latest changes to the Section 8 voucher program that could impact thousands of renters and housing providers across Texas.',
    content: `
# HUD Announces Major Section 8 Program Updates for 2025

The U.S. Department of Housing and Urban Development has unveiled comprehensive updates to the Section 8 voucher program that will significantly impact both renters and property owners across Texas.

## Key Program Changes

### Voucher Pool Expansion
- 25% increase in available vouchers statewide
- Priority allocation to high-demand areas
- Enhanced veteran voucher programs

### Landlord Incentives
- Increased voucher payment amounts
- Streamlined approval processes
- Enhanced property inspection waivers

### Applicant Eligibility Updates
- Expanded income qualification ranges
- Simplified application procedures
- Improved portability options

## Texas-Specific Implementation

### Local Program Adjustments
- Austin-area voucher caps increased by 15%
- Rural county programs expanded
- Mobile home park voucher acceptance

### Timeline and Rollout
- Phase 1 implementation: January 2025
- Full system integration: April 2025
- Training completion for property owners

## Impact on Veterans

### Enhanced Support Programs
- VASH voucher priority processing
- Integrated VA service coordination
- Specialized housing counselor networks

## What This Means for Property Owners

### Financial Benefits
- Higher rental income guarantees
- Reduced vacancy periods
- Improved property maintenance standards

### Operational Improvements
- Digital application processing
- Automated payment systems
- Enhanced reporting tools

## Conclusion

These Section 8 program updates represent the most significant housing assistance enhancement in recent years. Property owners and renters alike stand to benefit from improved program efficiency and expanded coverage.
    `,
    author: 'Michael Chen',
    category: 'Policy Updates',
    tags: ['section 8', 'HUD', 'policy changes', 'texas housing'],
    published_at: '2024-11-10',
    reading_time: 4,
    featured_image: '/api/placeholder/1200/600',
    seo_title: '2025 Section 8 Program Updates | Latest HUD Changes',
    seo_description: 'Stay informed about the latest Section 8 voucher program changes from HUD that affect Texas renters and property owners.'
  },
  {
    id: '3',
    slug: 'veteran-housing-strategies',
    title: 'Strategic Approaches to Veteran Housing: Beyond Section 8',
    excerpt: 'Exploring alternative housing solutions and support programs specifically designed to address the unique challenges faced by veteran homeowners.',
    content: `
# Strategic Approaches to Veteran Housing: Beyond Section 8

While Section 8 vouchers provide essential rental assistance, veterans have access to a comprehensive array of housing support programs that address the full spectrum of housing needs and challenges.

## VA Loan Programs Overview

### VA Purchase Loans
The cornerstone of veteran homeownership assistance:
- 100% financing options available
- Competitive interest rates
- Waiver of PMI requirements
- Flexible qualification criteria

### VA Refinance Options
Streamlined refinancing for existing homeowners:
- Interest rate reduction loans
- Cash-out refinancing
- Streamlined refinance programs

## Specialized Veteran Housing Programs

### Homeless Veteran Programs
Comprehensive support for housing stability:
- HUD-VASH voucher coordination
- Emergency housing assistance
- Case management services
- Employment support integration

### Home Modifications Program
Adapted housing for service-related disabilities:
- Accessibility modifications
- Medical equipment installation
- Home safety improvements
- VA funding coordination

## State and Local Resources

### Texas Veteran Housing Initiatives
- Purple Heart veteran preferences
- Veteran business development loans
- Local housing authority partnerships

## Financial Planning Strategies

### Down Payment Assistance
Multiple down payment support options:
- VA entitlement restoration
- Gifts from approved sources
- Seller concessions
- Community development programs

### Credit Rehabilitation
Programs to improve credit standing:
- VA-sponsored credit counseling
- Nonprofit credit restoration services
- Alternative lender programs

## Long-Term Housing Stability

### Building Wealth Through Homeownership
- Equity building strategies
- Property appreciation benefits
- Tax advantage utilization
- Investment property opportunities

## Conclusion

Veterans have access to an extensive network of housing support programs that extend far beyond traditional rental assistance. Strategic utilization of these resources can provide comprehensive housing stability and wealth-building opportunities.
    `,
    author: 'Dr. Robert Williams',
    category: 'Veteran Support',
    tags: ['veterans', 'housing assistance', 'VA loans', 'homeownership'],
    published_at: '2024-11-05',
    reading_time: 6,
    featured_image: '/api/placeholder/1200/600',
    seo_title: 'Advanced Veteran Housing Strategies | VA Programs & Support',
    seo_description: 'Discover comprehensive housing strategies for veterans including VA loans, down payment assistance, and specialized housing programs.'
  }
];

interface ArticleParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticleParams) {
  const article = mockArticles.find(a => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Article Not Found'
    };
  }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author],
      tags: article.tags,
      images: article.featured_image ? [article.featured_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt,
      images: article.featured_image ? [article.featured_image] : [],
    },
    alternates: {
      canonical: `/insights/${article.slug}`,
    },
  };
}

export default function ArticlePage({ params }: ArticleParams) {
  const article = mockArticles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-brand-navy to-brand-cocoa text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-brand-beige text-brand-navy rounded-full text-sm font-semibold mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {article.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{article.author}</div>
                  <div className="text-sm text-slate-300">
                    {new Date(article.published_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span>{article.reading_time} min read</span>
                {/* Social Share Buttons */}
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg prose-slate max-w-none">
          {article.featured_image && (
            <div className="mb-12">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="prose-headings:text-brand-navy prose-p:text-slate-700 prose-strong:text-brand-navy prose-ul:text-slate-700 prose-ol:text-slate-700">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
            ) : (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <p className="text-slate-600">Full article content coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-brand-beige hover:text-brand-navy transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center text-white font-medium">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-slate-900">{article.author}</div>
                <div className="text-sm text-slate-500">Housing Market Analyst</div>
              </div>
            </div>
            <Link
              href="/insights"
              className="px-6 py-3 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors font-medium"
            >
              ← Back to Insights
            </Link>
          </div>
        </footer>
      </main>

      {/* Related Articles */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-brand-navy mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles
              .filter(a => a.id !== article.id && a.category === article.category)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/insights/${relatedArticle.slug}`}
                  className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-card/80 transition-shadow group"
                >
                  <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
                    {relatedArticle.featured_image && (
                      <Image
                        src={relatedArticle.featured_image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-brand-beige/20 text-brand-navy rounded-full mb-2">
                      {relatedArticle.category}
                    </span>
                    <h3 className="font-bold text-brand-navy mb-2 line-clamp-2 group-hover:text-brand-navy/80">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}
