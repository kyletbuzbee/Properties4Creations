'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [showAccessibilityWidget, setShowAccessibilityWidget] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P4</span>
              </div>
              <h3 className="text-2xl font-bold">Properties 4 Creations</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Expert renovations and housing evaluations for veterans.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <span className="mr-3">📧</span>
                <a href="mailto:contact@properties4creations.com">contact@properties4creations.com</a>
              </div>
              <div className="flex items-center text-slate-300">
                <span className="mr-3">📞</span>
                <a href="tel:+15125550123">(512) 555-0123</a>
              </div>
              <div className="flex items-center text-slate-300">
                <span className="mr-3">📍</span>
                <span>Austin, Texas & Surrounding Areas</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-slate-300 hover:text-white">Home Renovations</Link></li>
              <li><Link href="/housing" className="text-slate-300 hover:text-white">Veteran Housing</Link></li>
              <li><Link href="/cash-offers" className="text-slate-300 hover:text-white">Cash Offers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-300 hover:text-white">About Us</Link></li>
              <li><Link href="/team" className="text-slate-300 hover:text-white">Our Team</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/resources" className="text-slate-300 hover:text-white">For Veterans</Link></li>
              <li><Link href="/testimonials" className="text-slate-300 hover:text-white">Success Stories</Link></li>
              <li><Link href="/faq" className="text-slate-300 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-12 pt-8">
          {/* Legal & Accessibility Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6 text-center text-sm">
            <Link href="/accessibility" className="text-slate-400 hover:text-teal-300 transition-colors flex flex-col items-center">
              <span className="text-2xl mb-1">♿</span>
              Accessibility Statement
            </Link>
            <Link href="/privacy" className="text-slate-400 hover:text-teal-300 transition-colors flex flex-col items-center">
              <span className="text-2xl mb-1">🛡️</span>
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-teal-300 transition-colors flex flex-col items-center">
              <span className="text-2xl mb-1">📋</span>
              Terms of Service
            </Link>
            <button
              onClick={() => setShowAccessibilityWidget(!showAccessibilityWidget)}
              className="text-slate-400 hover:text-teal-300 transition-colors flex flex-col items-center"
            >
              <span className="text-2xl mb-1">🎨</span>
              Accessibility Settings
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} Properties 4 Creation. All rights reserved.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-slate-400">Made with</span>
              <span className="text-red-500">❤️</span>
              <span className="text-slate-400">for veterans</span>
            </div>
          </div>
        </div>

        {/* Accessibility Widget */}
        {showAccessibilityWidget && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAccessibilityWidget(false)} />
            <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-2xl border z-50 min-w-80">
              <h3 className="font-bold mb-3 text-gray-800">Accessibility Settings</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Size</label>
                  <select className="w-full p-2 border rounded text-sm">
                    <option>Normal</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contrast</label>
                  <select className="w-full p-2 border rounded text-sm">
                    <option>Normal</option>
                    <option>High Contrast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motion</label>
                  <select className="w-full p-2 border rounded text-sm">
                    <option>Normal</option>
                    <option>Reduced Motion</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowAccessibilityWidget(false)}
                  className="w-full bg-brand-teal text-white py-2 rounded text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  Apply Settings
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
