'use client';

import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-navy via-brand-slate to-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "url('/section8-housing.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Quality Section 8 Housing<br/>
              <span className="text-brand-olive">Built for Veterans</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We specialize in providing beautifully maintained rental homes and apartments that meet Section 8 housing standards, designed specifically for veterans and their families.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                View Available Properties
              </button>
              <button className="bg-brand-olive hover:bg-lime-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Check Qualification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Section 8 Qualified</h3>
              <p className="text-gray-600">All properties meet federal housing standards for Section 8 program participation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-olive rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Maintenance</h3>
              <p className="text-gray-600">Regular property maintenance and 24/7 emergency support for residents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Veteran-Focused</h3>
              <p className="text-gray-600">Dedicated support for veterans with understanding of military housing needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-brand-sand">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-slate">Featured Rental Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                <div className="absolute top-4 left-4 bg-brand-olive text-white px-3 py-1 rounded-full text-sm font-medium">
                  Section 8 Qualified
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-brand-navy text-white px-3 py-1 rounded text-sm font-medium">3 Bedroom</span>
                  <span className="text-white font-bold">$1,200/mo</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">123 Oak Street</h3>
                <p className="text-gray-600 mb-2">Austin, TX 78704</p>
                <p className="text-sm text-gray-500 mb-4">Recently renovated 3BR/2BA single-family home with fenced yard</p>
                <button className="w-full bg-brand-navy hover:bg-blue-800 text-white py-2 rounded transition-colors">
                  Apply Now
                </button>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                <div className="absolute top-4 left-4 bg-brand-olive text-white px-3 py-1 rounded-full text-sm font-medium">
                  Section 8 Qualified
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-brand-navy text-white px-3 py-1 rounded text-sm font-medium">2 Bedroom</span>
                  <span className="text-white font-bold">$950/mo</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">456 Maple Apartment</h3>
                <p className="text-gray-600 mb-2">Dallas, TX 75201</p>
                <p className="text-sm text-gray-500 mb-4">Modern downtown apartment with community amenities</p>
                <button className="w-full bg-brand-navy hover:bg-blue-800 text-white py-2 rounded transition-colors">
                  Apply Now
                </button>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                <div className="absolute top-4 left-4 bg-brand-olive text-white px-3 py-1 rounded-full text-sm font-medium">
                  Section 8 Qualified
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-brand-navy text-white px-3 py-1 rounded text-sm font-medium">4 Bedroom</span>
                  <span className="text-white font-bold">$1,600/mo</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">789 Pine Family Home</h3>
                <p className="text-gray-600 mb-2">Houston, TX 77001</p>
                <p className="text-sm text-gray-500 mb-4">Spacious family home in quiet neighborhood with large yard</p>
                <button className="w-full bg-brand-navy hover:bg-blue-800 text-white py-2 rounded transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed mb-8">
            Properties 4 Creations is dedicated to providing high-quality, Section 8 qualified rental housing specifically designed for veterans and their families. We understand that finding safe, affordable housing is crucial for military families transitioning to civilian life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="text-left space-y-2">
                <li>✅ Full Section 8 program compliance</li>
                <li>✅ Properties built with veteran families in mind</li>
                <li>✅ 24/7 maintenance and security support</li>
                <li>✅ Streamlined application process</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
              <ul className="text-left space-y-2">
                <li>✅ Supporting military families during transitions</li>
                <li>✅ Maintaining high standards of property management</li>
                <li>✅ Building lasting relationships within the veteran community</li>
                <li>✅ Contributing to thriving veteran neighborhoods</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-brand-slate">Ready to Apply?</h2>
          <p className="text-lg mb-8 text-gray-600">
            If you're a qualified veteran or family member interested in our Section 8 properties, we'd love to help you find your new home.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/apply" className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
              Start Application
            </a>
            <a href="/contact" className="bg-brand-navy hover:bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
