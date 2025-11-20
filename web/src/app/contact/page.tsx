import React from 'react';
import MultiStepLeadForm from '@/components/MultiStepLeadForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-200 mb-8">
            Ready to make a difference? We're here to help you find housing solutions,
            evaluate properties, or partner with us on veteran housing initiatives.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-navy mb-1">Email</h3>
                    <a href="mailto:contact@properties4creation.com" className="text-slate-600 hover:text-brand-red transition-colors">
                      contact@properties4creation.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-navy mb-1">Phone</h3>
                    <a href="tel:+15125550123" className="text-slate-600 hover:text-brand-red transition-colors">
                      (512) 555-0123
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-navy mb-1">Location</h3>
                    <p className="text-slate-600">
                      Austin, Texas & Surrounding Areas
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 bg-brand-olive/10 border border-brand-olive/20 rounded-lg p-6">
                <h3 className="font-semibold text-brand-navy mb-2">Response Time</h3>
                <p className="text-slate-700 text-sm">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent property evaluations, please call us directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How quickly can you evaluate my property?",
                answer: "We schedule property evaluations within 24-48 hours of your inquiry, weather permitting."
              },
              {
                question: "Do you handle properties outside of Austin?",
                answer: "We primarily serve Austin and surrounding areas to ensure we can provide the best local expertise and follow-up."
              },
              {
                question: "What's the process for Section 8 applicants?",
                answer: "We connect qualified veterans with Section 8 approved properties and provide guidance throughout the housing search process."
              },
              {
                question: "Are your services free for veterans?",
                answer: "Housing consultations and Section 8 guidance are complimentary for veterans. Property evaluations involve a nominal fee."
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
    </main>
  );
}
