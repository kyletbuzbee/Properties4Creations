import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceIcon, ServiceIconType } from '@/components/ServiceIcon';
import { getHousingImages, FreepikImage } from '@/lib/freepik';

export default async function ResourcesPage() {
  // Fetch housing images from Freepik
  let affordableImages: FreepikImage[] = [];
  let veteranImages: FreepikImage[] = [];
  let familyImages: FreepikImage[] = [];

  try {
    [affordableImages, veteranImages, familyImages] = await Promise.all([
      getHousingImages('affordable', 6),
      getHousingImages('veteran', 6),
      getHousingImages('family', 6),
    ]);
  } catch (error) {
    console.error('Error fetching housing images:', error);
  }
  const resourceCategories = [
    {
      title: "Section 8 Info & Eligibility",
      description: "Complete guide with voucher calculator, income estimates, and eligibility requirements for Housing Choice Vouchers",
      iconType: "housing",
      href: "/resources/section8",
      featured: true
    },
    {
      title: "Home Evaluation Guide",
      description: "Learn what to expect from professional property evaluations and renovation planning",
      iconType: "documentation",
      href: "/resources/evaluation-guide",
      featured: false
    },
    {
      title: "Veteran Housing Programs",
      description: "Overview of VA loan programs, special veteran housing initiatives, and support services",
      iconType: "support",
      href: "/resources/veteran-programs",
      featured: false
    },
    {
      title: "Property Renovation Timeline",
      description: "Understand typical renovation phases, permits, and project completion expectations",
      iconType: "efficiency",
      href: "/resources/renovation-timeline",
      featured: false
    },
    {
      title: "Market Value & Cash Offers",
      description: "How we determine fair market value and provide competitive cash offers for properties",
      iconType: "affordable",
      href: "/resources/cash-offers",
      featured: false
    },
    {
      title: "Success Stories",
      description: "Real stories from veterans who've found housing and sellers who've made a difference",
      iconType: "partnership",
      href: "/resources/success-stories",
      featured: false
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Resources & Guides
          </h1>
          <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
            Navigate housing programs with confidence. Access detailed guides, program information,
            and success stories to help you make informed decisions.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                className={`group bg-white rounded-xl shadow-card hover:shadow-float transition-all duration-300 border border-slate-100 overflow-hidden ${
                  resource.featured ? 'ring-2 ring-brand-teal ring-opacity-50' : ''
                }`}
              >
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ServiceIcon type={resource.iconType as ServiceIconType} size="lg" />
                  </div>

                  <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-red transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-slate-600 mb-4">
                    {resource.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-brand-teal group-hover:text-brand-teal/80">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {resource.featured && (
                  <div className="px-8 pb-6">
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-brand-teal text-white rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Housing Image Galleries */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Affordable Housing Gallery */}
          {affordableImages && affordableImages.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-brand-navy mb-2">Affordable Housing Communities</h2>
              <p className="text-lg text-slate-600 mb-8">Professional housing solutions designed for families seeking stability</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {affordableImages.map((image) => (
                  image && image.preview && image.preview.url ? (
                  <div key={image.id} className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Image
                      src={image.preview.url}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <p className="text-white font-semibold text-sm">{image.title}</p>
                      <p className="text-gray-200 text-xs">by {image.creator.name}</p>
                    </div>
                  </div>
                  ) : null
                ))}
              </div>
            </div>
          )}

          {/* Veteran Housing Gallery */}
          {veteranImages && veteranImages.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-brand-navy mb-2">Veteran Housing Programs</h2>
              <p className="text-lg text-slate-600 mb-8">Dedicated housing support and assistance for our nation's veterans</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {veteranImages.map((image) => (
                  image && image.preview && image.preview.url ? (
                  <div key={image.id} className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Image
                      src={image.preview.url}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <p className="text-white font-semibold text-sm">{image.title}</p>
                      <p className="text-gray-200 text-xs">by {image.creator.name}</p>
                    </div>
                  </div>
                  ) : null
                ))}
              </div>
            </div>
          )}

          {/* Family Housing Gallery */}
          {familyImages && familyImages.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-2">Family Housing Options</h2>
              <p className="text-lg text-slate-600 mb-8">Quality homes that nurture family growth and stability</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {familyImages.map((image) => (
                  image && image.preview && image.preview.url ? (
                  <div key={image.id} className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Image
                      src={image.preview.url}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <p className="text-white font-semibold text-sm">{image.title}</p>
                      <p className="text-gray-200 text-xs">by {image.creator.name}</p>
                    </div>
                  </div>
                  ) : null
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about our programs and services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How do I get a cash offer for my property?",
                answer: "Contact us through our get started form. We'll schedule a property evaluation within 24 hours. Our process is fast, fair, and committed to helping veterans."
              },
              {
                question: "What types of renovations do you perform?",
                answer: "We specialize in veterans' housing needs including full renovations, accessibility upgrades, kitchen/bathroom remodels, and property evaluations."
              },
              {
                question: "Do you work with Section 8 vouchers?",
                answer: "Yes! We have certified Section 8 eligible properties and help match qualified veterans with housing that accepts Housing Choice Vouchers."
              },
              {
                question: "How long does a typical renovation take?",
                answer: "Projects range from 1-3 months depending on scope. We provide detailed timelines upfront and keep you updated throughout the process."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-brand-navy text-lg">
                  {faq.question}
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Whether you're looking for housing or want to contribute property to help veterans,
            we're here to guide you through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-white text-brand-red hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get Started Today
            </Link>
            <Link href="/projects" className="border-2 border-white text-white hover:bg-white hover:text-brand-red px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
