'use client';

import React from 'react';
import Link from 'next/link';
import BentoGridStats from '@/components/BentoGridStats';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Properties 4 Creations
            </h1>
            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Restoring homes, rebuilding lives. We're passionate about making housing accessible
              for veterans through expert renovations and Section 8 support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">Our Mission</h2>
            <p className="text-lg text-slate-700 max-w-4xl mx-auto">
              Properties 4 Creation was founded with a singular purpose: to honor veterans by
              providing them with safe, renovated homes they can call their own. We believe that
              everyone who served our country deserves to live in dignity and comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <BentoGridStats />

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Team</h2>
            <p className="text-xl text-slate-600">
              Experienced professionals dedicated to veteran housing solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kyle Turner",
                role: "Founder & CEO",
                bio: "Navy veteran and entrepreneur passionate about giving back to the veteran community. Founded P4C to address critical housing needs."
              },
              {
                name: "Sarah Johnson",
                role: "Project Manager",
                bio: "10+ years in construction management, ensuring every renovation meets P4C's high standards for quality and timeliness."
              },
              {
                name: "Mike Rodriguez",
                role: "Lead Contractor",
                bio: "Licensed contractor specializing in residential renovations with focus on accessibility and veteran-specific housing needs."
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl text-brand-olive/50">👤</span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{member.name}</h3>
                <div className="text-sm font-medium text-brand-teal mb-4">{member.role}</div>
                <p className="text-slate-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Help us restore homes and rebuild lives. Contact us today to learn how you can contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-white text-brand-red hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get Involved
            </Link>
            <Link href="/projects" className="border-2 border-white text-white hover:bg-white hover:text-brand-red px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
