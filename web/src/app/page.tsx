'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Restoring Homes,<br/>
            Rebuilding Lives<br/>
            <span className="text-blue-400">for Veterans</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Expert renovations and housing evaluations for those who served our country.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get a Cash Offer
            </Link>
            <Link href="/resources" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Find Veteran Housing
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">120+</div>
              <div className="text-xl">Veterans Housed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$25k+</div>
              <div className="text-xl">Average Budget Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section className="bg-red-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">
            Whether you're a seller looking to help veterans, or a veteran seeking housing.
          </p>
          <Link href="/get-started" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Get Involved Today
          </Link>
        </div>
      </section>
    </main>
  );
}
