'use client';

import React, { useState, useEffect } from 'react';

interface TransformationStory {
  id: string;
  family: string;
  location: string;
  story: string;
  outcome: string;
  transformation_image: string;
  verified: boolean;
}

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const transformationStories: TransformationStory[] = [
    {
      id: '1',
      family: 'The Garcia Family',
      location: 'Austin, TX',
      story: 'When Sgt. Garcia returned from deployment, our family of five was living in temporary housing. We never thought we\'d find a place that felt like home again.',
      outcome: 'Now we\'re in a fully renovated three-bedroom apartment with space for everyone. The kids have their own rooms, and we\'ve hosted our first family Christmas in years!',
      transformation_image: '/images/family-garcia.jpg',
      verified: true
    },
    {
      id: '2',
      family: 'Lt. Commander Sarah & Children',
      location: 'Round Rock, TX',
      story: 'After my divorce, I was a single veteran mom with three kids trying to navigate housing assistance alone. The paperwork seemed impossible.',
      outcome: 'Properties 4 Creations simplified everything. They helped with Section 8 application, found us this beautiful renovated home, and even connected us with veteran support services.',
      transformation_image: '/images/family-sarah.jpg',
      verified: true
    },
    {
      id: '3',
      family: 'The Martinez Extended Family',
      location: 'Cedar Park, TX',
      story: 'When my elderly parents became unable to live alone, we needed accessible housing that would work for our entire family support network.',
      outcome: 'This renovated property with ramps, wide doorways, and accessible bathrooms allows our whole family to gather comfortably. Grandma & Grandpa love having everyone over.',
      transformation_image: '/images/family-martinez.jpg',
      verified: true
    },
    {
      id: '4',
      family: 'Cpl. Johnson\'s Second Chance',
      location: 'Pflugerville, TX',
      story: 'After being homeless for months, I was losing hope that I\'d ever have stability again. The system felt designed to reject people like me.',
      outcome: 'Today I\'m standing on the porch of my own apartment, keys in hand. This beautifully renovated space gives me the stability every veteran deserves.',
      transformation_image: '/images/family-johnson.jpg',
      verified: true
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % transformationStories.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, transformationStories.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformationStories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformationStories.length) % transformationStories.length);
  };

  const currentStory = transformationStories[currentIndex];

  return (
    <section className="py-20 bg-[var(--bg-sand)]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6">
            Real <span className="bg-gradient-to-r from-brand-teal to-brand-olive bg-clip-text text-transparent">Transformation</span> Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            These aren't just testimonials—they're stories of restoration, dignity, and fresh starts.
            See the real impact we've made in veterans' lives across Texas.
          </p>
        </div>

        {/* Main Story Card */}
        <div className="relative">
          {/* Story Card */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-500 animate-fade-in-up">
            {/* Hero Image */}
            <div className="relative h-80 md:h-96 bg-gradient-to-br from-amber-50 to-orange-50">
              {/* Default family silhouette as placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 opacity-20">👨‍👩‍👧‍👦</div>
                  <p className="text-slate-500 italic">{currentStory.family}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="text-sm font-medium text-slate-600">📍 {currentStory.location}</span>
                    {currentStory.verified && (
                      <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                        <span className="text-green-600">✓</span>
                        <span className="text-xs text-green-700 font-medium">Verified Story</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-8 md:p-12">
              {/* Story Heading */}
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy mb-2">
                  "{currentStory.family}"
                </h3>
                <p className="text-slate-600 italic">
                  {currentStory.location}
                </p>
              </div>

              {/* Story Narrative */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-600 mb-3">Their Challenge</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {currentStory.story}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-brand-teal mb-3">Their Transformation</h4>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {currentStory.outcome}
                  </p>
                </div>
              </div>

              {/* Impact Quote */}
              <div className="bg-gradient-to-r from-brand-teal/10 to-brand-olive/10 rounded-lg p-6 text-center">
                <blockquote className="text-lg md:text-xl text-brand-navy leading-relaxed italic">
                  "Today we're not just housed—we're home. This is what dignity feels like."
                </blockquote>
                <cite className="text-sm text-slate-600 mt-2 block">— {currentStory.family.split(' ')[0]}</cite>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <div className="flex gap-2">
                  {transformationStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-brand-teal scale-125'
                          : 'bg-gray-300 hover:bg-gray-400 scale-100'
                      }`}
                      aria-label={`Go to story ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white border border-gray-200 hover:border-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 hover:scale-110 group"
                    aria-label="Previous story"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white border border-gray-200 hover:border-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 hover:scale-110 group"
                    aria-label="Next story"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-card px-8 py-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-brand-navy mb-6">
              Lives Transformed, Communities Strengthened
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-teal mb-1">85+</div>
                <div className="text-sm text-slate-600">Families Housed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-teal mb-1">42</div>
                <div className="text-sm text-slate-600">Veterans Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-teal mb-1">120</div>
                <div className="text-sm text-slate-600">Properties Bought</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-teal mb-1">$25k</div>
                <div className="text-sm text-slate-600">Average Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
