'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroStats {
  number: string;
  label: string;
  suffix?: string;
}

interface CallToAction {
  text: string;
  href: string;
  primary?: boolean;
  icon?: string;
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctas: CallToAction[];
  stats?: HeroStats[];
  showVideo?: boolean;
  videoUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctas,
  stats,
  showVideo = true,
  videoUrl
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Video/Image */}
      {showVideo && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            {/* Fallback image */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-teal to-brand-olive opacity-80" />
          </video>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-olive-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-red-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-navy-300 rounded-full animate-float opacity-30" style={{ animationDelay: '0.5s' }} />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
        {/* Main Heading */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-6 leading-tight hero-mobile-text">
            {title.split(' ').slice(0, 2).join(' ')}
            <span className="block bg-gradient-to-r from-brand-red via-brand-teal to-brand-olive bg-clip-text text-transparent">
              {title.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Call-to-Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {ctas.map((cta, index) => (
            <Link
              key={index}
              href={cta.href}
              className={`group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 ${
                cta.primary
                  ? 'bg-gradient-cta text-white shadow-red-500/25 hover:shadow-red-500/40'
                  : 'glass-strong text-white border border-white/20 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                {cta.icon && <span className="text-2xl">{cta.icon}</span>}
                {cta.text}
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              {cta.primary && (
                <div className="absolute inset-0 bg-gradient-cta opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-300" />
              )}
            </Link>
          ))}
        </div>

        {/* Statistics Counter */}
        {stats && stats.length > 0 && (
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl glass backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover-lift"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 counter-number">
                  {stat.number}
                  {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
                </div>
                <div className="text-sm md:text-base text-slate-300 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm tracking-wider">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full relative">
              <div className="w-1 h-2 bg-white/60 rounded-full absolute left-1/2 top-2 -translate-x-1/2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Premium corner accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500/10 via-teal-500/5 to-transparent rounded-bl-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-olive-500/10 via-navy-500/5 to-transparent rounded-tr-full opacity-50" />
    </section>
  );
};

export default HeroSection;
