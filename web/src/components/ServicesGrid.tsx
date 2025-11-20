'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface ServiceCardData {
  icon: string;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
  gradient: string;
}

const ServicesGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations for child elements
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services: ServiceCardData[] = [
    {
      icon: '',
      title: 'Property Renovation',
      description: 'Professional home renovations meeting HUD standards and accessibility requirements',
      features: ['Accessibility compliance upgrades', 'Energy-efficient installations', 'Licensed contractor services'],
      gradient: 'from-brand-navy to-brand-cocoa'
    },
    {
      icon: '',
      title: 'Fair Cash Offers',
      description: 'Transparent property evaluation with competitive cash offers',
      features: ['Professional appraisal', '24-hour response time', 'Commission-free transactions'],
      gradient: 'from-brand-cocoa to-brand-tan',
      popular: true
    },
    {
      title: 'Affordable Housing Access',
      description: 'Section 8 voucher assistance connecting qualified renters with HQS-certified homes',
      features: ['Program eligibility guidance', 'HUD-certified property matching', 'Rental assistance coordination'],
      icon: '',
      gradient: 'from-brand-sage to-brand-cocoa',
      popular: true
    },
    {
      icon: '',
      title: 'Property Management',
      description: 'Comprehensive investment property management services',
      features: ['Background screening process', 'Maintenance coordination', 'Rent collection and reporting'],
      gradient: 'from-brand-tan to-brand-sage'
    },
    {
      icon: '',
      title: 'Investment Analysis',
      description: 'Strategic real estate investment consulting and market analysis',
      features: ['Comprehensive market research', 'Financial performance modeling', 'Risk assessment reports'],
      gradient: 'from-brand-navy to-brand-tan'
    },
    {
      icon: '',
      title: 'Community Partnerships',
      description: 'Collaborative housing initiatives with veterans and community organizations',
      features: ['Strategic partnerships', 'Grant and funding programs', 'Community impact measurement'],
      gradient: 'from-brand-sage to-brand-navy'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[var(--bg-sand)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6">
            Comprehensive <span className="bg-gradient-to-r from-brand-teal to-brand-olive bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From property renovations to Section 8 support, we deliver end-to-end solutions
            for veterans and real estate investors alike.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative p-8 bg-white rounded-2xl shadow-card hover:shadow-float transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse-soft">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-3xl text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-teal transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/services"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg group-hover:shadow-xl group-hover:scale-105`}
                >
                  Learn More
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Hover Effect Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-strong max-w-4xl mx-auto p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-brand-navy mb-4">
              Ready to Transform Your Property?
            </h3>
            <p className="text-gray-600 mb-6">
              Get started with a free consultation and discover how we can help you achieve
              your real estate goals.
            </p>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-3 bg-brand-navy text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Today
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
