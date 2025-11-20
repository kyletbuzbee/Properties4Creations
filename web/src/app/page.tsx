import ModernHero from '@/components/ModernHero';
import TrustBar from '@/components/TrustBar';
import ServicesGrid from '@/components/ServicesGrid';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

export default function Home() {

  return (
    <main className="overflow-hidden">
      <ModernHero />
      <TrustBar />
      <ServicesGrid />

      <TestimonialsCarousel />

      {/* Call to Action Final Section */}
      <section className="py-20 bg-gradient-to-br from-brand-navy via-slate-800 to-brand-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to Make a <span className="bg-gradient-to-r from-brand-teal to-brand-olive bg-clip-text text-transparent">Difference?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Whether you're a veteran seeking housing support, a homeowner wanting a fair cash offer,
            or an investor looking for property management services, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/get-started"
              className="group relative bg-gradient-cta text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Start Your Journey Today
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-cta opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300" />
            </a>

            <a
              href="/contact"
              className="glass-strong text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover-lift"
            >
              Schedule Consultation
            </a>
          </div>

          <p className="text-slate-400 mt-8 text-lg">
            No obligation • Free consultations • Veteran-focused support
          </p>
        </div>
      </section>
    </main>
  );
}
