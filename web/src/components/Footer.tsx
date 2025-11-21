'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [showAccessibilityWidget, setShowAccessibilityWidget] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">P4C</h3>
            <p className="text-slate-300 mb-6">
              Expert renovations and housing evaluations for veterans.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300 hover:text-white transition-colors">
                <span className="mr-3">📧</span>
                <a href="mailto:contact@properties4creations.com" className="hover:underline">contact@p4c.com</a>
              </div>
              <div className="flex items-center text-slate-300 hover:text-white transition-colors">
                <span className="mr-3">📞</span>
                <a href="tel:+15125550123" className="hover:underline">(512) 555-0123</a>
              </div>
              <div className="flex items-center text-slate-300">
                <span className="mr-3">📍</span>
                <span>Austin, Texas</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-sage">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/projects" className="text-slate-300 hover:text-white transition-colors">Our Work</Link></li>
              <li><Link href="/resources" className="text-slate-300 hover:text-white transition-colors">For Veterans</Link></li>
              <li><Link href="/insights" className="text-slate-300 hover:text-white transition-colors">Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-sage">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-sage">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/accessibility" className="text-slate-300 hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300">&copy; {currentYear} Properties 4 Creation. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-slate-300 hover:text-white text-sm transition-colors">Privacy</Link>
              <span className="text-slate-600">•</span>
              <Link href="/terms" className="text-slate-300 hover:text-white text-sm transition-colors">Terms</Link>
              <span className="text-slate-600">•</span>
              <button onClick={() => setShowAccessibilityWidget(!showAccessibilityWidget)} className="text-slate-300 hover:text-white text-sm transition-colors">Accessibility</button>
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
