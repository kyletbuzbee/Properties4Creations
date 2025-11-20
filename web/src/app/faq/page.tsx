'use client';

import React from 'react';
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      category: "Property Services",
      questions: [
        {
          question: "How do I get a cash offer for my property?",
          answer: "Contact us through our contact form or call us directly. We'll schedule a property evaluation within 24-48 hours. Our process is fast, fair, and committed to helping veterans access the housing they deserve."
        },
        {
          question: "What types of renovations do you perform?",
          answer: "We specialize in veteran housing needs including full renovations, accessibility upgrades (wheelchair ramps, grab bars), kitchen/bathroom remodels, and property evaluations. Each renovation is tailored to meet HUD Housing Quality Standards."
        },
        {
          question: "How long does a typical renovation take?",
          answer: "Projects range from 4-12 weeks depending on scope. We provide detailed timelines upfront and keep you updated throughout the process. Accessibility upgrades are usually completed in 2-4 weeks."
        },
        {
          question: "Do you provide property management services?",
          answer: "While we focus on renovations and property acquisitions, we can recommend trusted property management partners for ongoing maintenance and tenant management services."
        }
      ]
    },
    {
      category: "Section 8 Housing Program",
      questions: [
        {
          question: "What is Section 8 housing?",
          answer: "Section 8 (Housing Choice Vouchers) is a federal program that helps eligible families, veterans, seniors, and individuals afford rental housing in the private market. Landlords receive guaranteed rental payments from the Public Housing Authority (PHA)."
        },
        {
          question: "How do you help veterans with Section 8?",
          answer: "We maintain a portfolio of Section 8 certified properties, help veterans navigate the voucher application process, and connect eligible applicants with suitable housing options that meet their needs."
        },
        {
          question: "What's the waiting list like for Section 8 vouchers?",
          answer: "Wait times vary by jurisdiction. In Austin, wait times are typically 6-18 months. Veterans often receive priority placement due to their service."
        },
        {
          question: "Can I choose any property with my voucher?",
          answer: "You can choose any rental property that meets HUD Housing Quality Standards, is within the Fair Market Rent limits of your voucher amount, and doesn't discriminate against voucher holders."
        },
        {
          question: "What happens if the rent is higher than my voucher?",
          answer: "Landlords may accept the voucher amount and you pay the difference, or they may choose not to participate. We help negotiate and find properties that work within your voucher limits."
        }
      ]
    },
    {
      category: "Veterans & Eligibility",
      questions: [
        {
          question: "What veterans services do you provide?",
          answer: "We provide housing consultations, property evaluations, renovation services specifically designed for veteran needs, and connections to Section 8 programs. All veterans receive priority consideration."
        },
        {
          question: "Do you have special programs for homeless veterans?",
          answer: "Yes, homeless veterans often receive expedited processing for housing placements. We work closely with local VA offices and veteran shelters to provide immediate housing solutions."
        },
        {
          question: "What documentation do veterans need?",
          answer: "Typically, DD-214 discharge papers, VA disability letters, or veteran eligibility verification. We accept VA Form DD-214, VA award letters, and other official military service documentation."
        },
        {
          question: "Are your services free for veterans?",
          answer: "Housing consultations and initial guidance are complimentary for veterans. Property evaluations involve a service fee that helps support our ongoing renovations and community programs."
        }
      ]
    },
    {
      category: "General Questions",
      questions: [
        {
          question: "What areas do you serve?",
          answer: "We primarily serve Austin, Texas and surrounding areas including Leander, Pflugerville, Round Rock, and nearby communities. This allows us to provide the best local expertise and follow-up service."
        },
        {
          question: "How do I get started?",
          answer: "Simply fill out our contact form on the website or call us directly. We'll schedule a consultation within 24 hours to discuss your housing needs and options."
        },
        {
          question: "Do you work with other veteran service organizations?",
          answer: "Absolutely! We partner with local VA offices, veteran shelters, housing authorities, and community organizations to maximize our impact and support for veterans."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-200 mb-8">
            Find answers to common questions about our veteran housing programs,
            property services, and Section 8 support.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-brand-navy mb-6 border-b border-slate-200 pb-4">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="bg-white rounded-lg p-6 shadow-card cursor-pointer hover:shadow-card/50 transition-shadow">
                    <summary className="font-semibold text-brand-navy text-lg hover:text-brand-red transition-colors">
                      {faq.question}
                    </summary>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-6">Still Have Questions?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Can't find the answer you're looking for? We'd love to help personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-brand-navy text-white hover:bg-brand-navy/90 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Contact Us
            </Link>
            <Link href="/get-started" className="border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
