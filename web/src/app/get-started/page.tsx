'use client';

import React from 'react';
import MultiStepLeadForm from '@/components/MultiStepLeadForm';

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Get Started
          </h1>
          <p className="text-xl text-slate-200 mb-8">
            Connect with Properties 4 Creation today. Whether you're selling a property to help veterans
            or seeking housing, we're here to guide you through every step.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Info */}
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Contact Us</h2>
              <p className="text-lg text-slate-700 mb-6">
                Ready to make a difference? Fill out the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                {/* Contact Methods */}
                <div className="bg-white p-6 rounded-lg shadow-card">
                  <h3 className="text-xl font-semibold text-brand-navy mb-4">How Can We Help?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🏠</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-navy">Selling a Property</h4>
                        <p className="text-sm text-slate-600">Want to help veterans find housing? We'll evaluate your property for a fair cash offer.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-brand-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🇺🇸</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-navy">Veteran Housing</h4>
                        <p className="text-sm text-slate-600">Need housing assistance? We help connect veterans with Section 8 eligible properties.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-brand-olive/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🤝</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-navy">Partnerships</h4>
                        <p className="text-sm text-slate-600">Interested in collaboration? Let's discuss how we can work together.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white p-6 rounded-lg shadow-card">
                  <h3 className="text-xl font-semibold text-brand-navy mb-4">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-red">50+</div>
                      <div className="text-sm text-slate-600">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-red">120+</div>
                      <div className="text-sm text-slate-600">Veterans Housed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-teal">35+</div>
                      <div className="text-sm text-slate-600">Section 8 Placements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-olive">$25k+</div>
                      <div className="text-sm text-slate-600">Average Budget Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-8">
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-olive text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore Our Current Projects</h2>
          <p className="text-xl mb-8">
            Browse our portfolio of completed renovations and available housing opportunities.
          </p>
          <a
            href="/projects"
            className="inline-block bg-white text-brand-olive hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            View Our Projects
          </a>
        </div>
      </section>
    </main>
  );
}
