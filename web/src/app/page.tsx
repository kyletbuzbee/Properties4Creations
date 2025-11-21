import ModernHero from '@/components/ModernHero';
import { IconBadge } from '@/components/IconBadge';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import Link from 'next/link';

export default function Home() {

  return (
    <main className="overflow-hidden">
      <ModernHero />

      {/* Why Choose Us Section with Icons */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
              Why Choose Properties 4 Creation?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're transforming East Texas housing through quality, fairness, and veteran support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <IconBadge 
              icon="housing" 
              title="Affordable Housing" 
              description="Quality homes designed for veterans and families seeking stable, dignified housing"
            />
            <IconBadge 
              icon="quality" 
              title="Quality Standards" 
              description="Every property undergoes rigorous renovation and inspection to meet our standards"
            />
            <IconBadge 
              icon="community" 
              title="Community Focus" 
              description="We invest in neighborhoods that support families and veteran success"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IconBadge 
              icon="support" 
              title="Ongoing Support" 
              description="From property search through move-in, we're here to help you succeed"
              variant="outline"
            />
            <IconBadge 
              icon="partnership" 
              title="Fair Partnership" 
              description="Transparent pricing and ethical practices in all our transactions"
              variant="outline"
            />
            <IconBadge 
              icon="efficiency" 
              title="Quick Process" 
              description="Streamlined Section 8 approvals and move-in support"
              variant="outline"
            />
          </div>
        </div>
      </section>

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

      {/* Featured Testimonials Carousel */}
      <section className="py-20 md:py-32 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-sage text-sm font-semibold tracking-wide mb-2">VETERAN VOICES</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Real Stories, Real Change
            </h2>
          </div>

          {/* Testimonials Carousel Component */}
          <TestimonialsCarousel />
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
