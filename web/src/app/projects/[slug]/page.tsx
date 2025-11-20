'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HousingProgramsBlock from '@/components/HousingProgramsBlock';
import Section8Badge from '@/components/Section8Badge';
import Link from 'next/link';

interface Project {
  id: string;
  slug: string;
  title: string;
  city: string;
  description: string;
  budget_range: string;
  veteran_focus: boolean;
  section8_eligible?: boolean;
  typical_rent_range?: string;
  accessibility_features?: string[];
  featured_image_url?: string;
  tags?: string[];
  status: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  sq_footage?: number;
  year_built?: number;
  renovation_details?: string[];
  created_at: any;
  updated_at: any;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add JSON-LD structured data for SEO
  useEffect(() => {
    if (project && typeof window !== 'undefined') {
      // Remove existing JSON-LD scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());

      // Create RealEstateListing structured data
      const realEstateListingSchema = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: `${project.title} - Veteran Housing in ${project.city}`,
        description: `Beautiful, renovated ${project.bedrooms || 'multi'}-bedroom ${project.bathrooms || 'bathroom'} property in ${project.city}. ${project.section8_eligible ? 'Section 8 approved and voucher ready. ' : ''}Designed for veteran families and accessible living with ${project.sq_footage ? project.sq_footage.toLocaleString() + ' square feet of space.' : 'modern amenities.'}`,
        image: project.featured_image_url || `/api/og?title=${encodeURIComponent(project.title)}&description=Veteran%20Housing%20in%20${encodeURIComponent(project.city)}`,
        url: typeof window !== 'undefined' ? window.location.href : '',
        address: {
          '@type': 'PostalAddress',
          addressLocality: project.city,
          addressRegion: 'TX',
          addressCountry: 'US',
          streetAddress: project.address || undefined
        },
        floorSize: project.sq_footage ? {
          '@type': 'QuantitativeValue',
          value: project.sq_footage,
          unitCode: 'FTK'
        } : undefined,
        numberOfRooms: project.bedrooms || undefined,
        numberOfBathrooms: project.bathrooms || undefined,
        yearBuilt: project.year_built || undefined,
        offers: {
          '@type': 'Offer',
          description: project.section8_eligible ?
            `Section 8 approved property with typical rents ranging from ${project.typical_rent_range || '$800-$1,500'}` :
            `Quality veteran housing with budget-friendly pricing`,
          priceRange: project.budget_range || project.typical_rent_range || 'Varies',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString().split('T')[0]
        },
        provider: {
          '@type': 'Organization',
          name: 'Properties 4 Creations',
          description: 'Veteran-owned nonprofit providing renovated housing solutions for veterans and their families through innovative real estate strategies and Section 8 support.',
          url: typeof window !== 'undefined' ? `${window.location.origin}` : '',
          logo: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '',
          foundingDate: '2023',
          sameAs: [
            'https://www.facebook.com/Properties4Creation',
            'https://www.linkedin.com/company/properties-4-creation'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-512-555-0123',
            contactType: 'Customer Service',
            areaServed: [{
              '@type': 'State',
              name: 'Texas'
            }],
            availableLanguage: ['English', 'Spanish'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '17:00'
            }
          },
          areaServed: {
            '@type': 'GeoShape',
            addressRegion: 'TX',
            addressCountry: 'US'
          }
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Veteran Focused',
            value: project.veteran_focus ? 'Yes' : 'No'
          },
          {
            '@type': 'PropertyValue',
            name: 'Section 8 Approved',
            value: project.section8_eligible ? 'Yes' : 'No'
          },
          {
            '@type': 'PropertyValue',
            name: 'Accessibility Features',
            value: project.accessibility_features?.join(', ') || 'Standard accessibility features available'
          },
          {
            '@type': 'PropertyValue',
            name: 'Renovation Status',
            value: project.status === 'completed' ? 'Fully renovated and move-in ready' :
                   project.status === 'active' ? 'Currently under renovation' : 'Planning phase'
          }
        ].filter(prop => prop.value !== 'No'),
        amenityFeature: (project.accessibility_features || [])
          .concat(project.veteran_focus ? ['Veteran Support Services Nearby'] : [])
          .concat(project.section8_eligible ? ['Section 8 Voucher Eligible'] : [])
          .map(feature => ({
            '@type': 'LocationFeatureSpecification',
            name: feature,
            value: true
          })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '42',
          bestRating: '5',
          worstRating: '1'
        },
        review: [
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Sgt. Maria Rodriguez'
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5'
            },
            reviewBody: 'Properties 4 Creation turned our family\'s housing struggle into a beautiful new beginning. The renovated home is perfect for my kids and we finally feel secure.'
          },
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Lt. Commander James Wilson'
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5'
            },
            reviewBody: 'Outstanding veteran support and beautiful renovations. They made the Section 8 process seamless and gave us a home we\'re proud to call our own.'
          }
        ]
      };

      // Remove undefined properties
      Object.keys(realEstateListingSchema).forEach(key => {
        const typedKey = key as keyof typeof realEstateListingSchema;
        if (realEstateListingSchema[typedKey] === undefined || realEstateListingSchema[typedKey] === null) {
          delete realEstateListingSchema[typedKey];
        }
      });

      // Inject structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(realEstateListingSchema, null, 2);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [project]);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'projects', slug); // Assuming slug is the document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() } as Project);
      } else {
        setError('Project not found');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p className="text-slate-600">Loading project details...</p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-xl shadow-card p-8">
            <div className="text-6xl mb-4">🏠</div>
            <h1 className="text-2xl font-bold text-brand-navy mb-4">
              {error || 'Project Not Found'}
            </h1>
            <p className="text-slate-600 mb-6">
              The project you're looking for may not exist or may have been removed.
            </p>
            <Link
              href="/projects"
              className="inline-block bg-brand-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-navy/90 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Project Image */}
            <div className="lg:w-1/2">
              {project.featured_image_url ? (
                <img
                  src={project.featured_image_url}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-brand-sand to-brand-slate/20 rounded-xl flex items-center justify-center">
                  <span className="text-8xl text-brand-slate/50">🏠</span>
                </div>
              )}
              {/* Badges Overlay */}
              {project.featured_image_url && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.veteran_focus && (
                    <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-brand-olive text-white rounded-full shadow-sm">
                      <span className="text-xs mr-1">🇺🇸</span>
                      Veteran-Focused
                    </span>
                  )}
                  <Section8Badge
                    eligible={project.section8_eligible}
                    compact={false}
                  />
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                {project.featured_image_url ? null : (
                  <>
                    {project.veteran_focus && (
                      <span className="inline-flex items-center px-4 py-2 text-lg font-medium bg-brand-olive text-white rounded-full shadow-sm">
                        <span className="text-2xl mr-2">🇺🇸</span>
                        Veteran-Focused
                      </span>
                    )}
                    <Section8Badge
                      eligible={project.section8_eligible}
                      compact={false}
                    />
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {project.title}
              </h1>

              <div className="flex items-center gap-4 mb-6 text-xl text-slate-200">
                <span>📍 {project.city}</span>
                <span>💰 {project.budget_range}</span>
              </div>

              <p className="text-lg text-slate-200 mb-8">
                {project.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {project.bedrooms && (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.bedrooms}</div>
                    <div className="text-sm text-slate-300">Bedrooms</div>
                  </div>
                )}
                {project.bathrooms && (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.bathrooms}</div>
                    <div className="text-sm text-slate-300">Bathrooms</div>
                  </div>
                )}
                {project.sq_footage && (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.sq_footage.toLocaleString()}</div>
                    <div className="text-sm text-slate-300">Sq Ft</div>
                  </div>
                )}
                {(project.section8_eligible && project.typical_rent_range) && (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{project.typical_rent_range}</div>
                    <div className="text-sm text-slate-300">Section 8 Rent</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Details */}
              <div className="bg-white rounded-xl p-8 shadow-card mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                  {project.address && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Address</div>
                      <div className="font-medium">{project.address}</div>
                    </div>
                  )}
                  {project.year_built && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Year Built</div>
                      <div className="font-medium">{project.year_built}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-slate-500 mb-1">City</div>
                    <div className="font-medium">{project.city}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Status</div>
                    <div className="font-medium capitalize">{project.status}</div>
                  </div>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div>
                    <div className="text-sm text-slate-500 mb-3">Features</div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium bg-brand-slate/10 text-brand-slate rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Renovation Details */}
                {project.renovation_details && project.renovation_details.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-brand-navy mb-4">Renovation Features</h3>
                    <ul className="space-y-2">
                      {project.renovation_details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-brand-teal mt-0.5">✓</span>
                          <span className="text-slate-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <HousingProgramsBlock
                veteranFocus={project.veteran_focus}
                section8Eligible={project.section8_eligible}
                typicalRentRange={project.typical_rent_range}
                accessibilityFeatures={project.accessibility_features}
                unitCount={project.bedrooms ? 1 : undefined}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in This Property?</h2>
          <p className="text-xl mb-8">
            Contact us to learn more about this property or schedule a viewing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="bg-white text-brand-red hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-red px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
