import ModernHero from '@/components/ModernHero';
import Link from 'next/link';

export default function Home() {

  return (
    <main className="overflow-hidden">
      <ModernHero />

      {/* Two-Column Value Proposition Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: For Property Owners */}
            <div className="animate-fade-in-left">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-6">
                Sell or Donate with Purpose
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Get a fair market cash offer for your property, or donate it to support veteran housing. Either way, your property transforms into stable housing for those who served.
              </p>
              <Link href="/get-started" className="inline-flex items-center gap-2 text-brand-sage hover:text-brand-sage/80 font-semibold">
                Learn More →
              </Link>
            </div>

            {/* Right: For Veterans */}
            <div className="animate-fade-in-right">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-6">
                Quality Housing, Accessible Rates
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Section 8 ready properties with veteran priority. We handle the paperwork. You get a renovated home that meets HUD standards and fits your rental assistance.
              </p>
              <Link href="/projects" className="inline-flex items-center gap-2 text-brand-sage hover:text-brand-sage/80 font-semibold">
                Browse Properties →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 md:py-32 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-sage text-sm font-semibold tracking-wide mb-2">VETERAN VOICES</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Real Stories, Real Change
            </h2>
          </div>

          {/* Single featured testimonial */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-sage to-brand-olive flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold">★</span>
              </div>
              <div>
                <p className="font-semibold text-lg">The Garcia Family</p>
                <p className="text-slate-300 text-sm">Austin, TX • Veteran Family</p>
              </div>
            </div>
            <blockquote className="text-lg leading-relaxed mb-6">
              "When Sgt. Garcia returned from deployment, we were living in temporary housing. Properties 4 Creations helped us find this beautiful renovated home. Now we're building memories again as a family."
            </blockquote>
            <Link href="/insights" className="inline-flex items-center gap-2 text-brand-sage hover:text-brand-sage/80 font-semibold">
              Read More Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-brand-olive to-brand-sage text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Move Forward?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Whether you're looking to buy, sell, or donate—we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="px-8 py-3 bg-white text-brand-olive font-semibold rounded-lg hover:bg-slate-100 transition-all"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
