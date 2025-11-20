'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md-text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-200 mb-8">
            Your privacy and data security are important to us. Learn how we protect
            and use your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-card">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-500 mb-8">
                Last updated: November 2025
              </p>

              <h2>1. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                When you contact Properties 4 Creation or use our services, we may collect:
              </p>
              <ul>
                <li>Name, email address, phone number, and mailing address</li>
                <li>Veteran status and service information</li>
                <li>Housing preferences and requirements</li>
                <li>Section 8 voucher status and housing authority information</li>
                <li>Accessibility needs and family composition details</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>
                We automatically collect certain information when you visit our website:
              </p>
              <ul>
                <li>IP address, browser type, and device information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral sources and website usage patterns</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <h3>Service Delivery</h3>
              <p>
                We use your information to:
              </p>
              <ul>
                <li>Provide property evaluations and renovation services</li>
                <li>Connect veterans with Section 8 eligible housing</li>
                <li>Respond to your inquiries and requests</li>
                <li>Schedule property tours and appointments</li>
                <li>Process transactions and maintain service records</li>
              </ul>

              <h3>Communication</h3>
              <p>
                We may use your contact information to:
              </p>
              <ul>
                <li>Send service-related updates and responses</li>
                <li>Provide information about veteran housing programs</li>
                <li>Share details about new properties or services</li>
                <li>Follow up on inquiries and consultations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties.
                We may share information only in the following circumstances:
              </p>

              <h3>Service Partners</h3>
              <p>
                With trusted partners who help us provide services:
              </p>
              <ul>
                <li>Local housing authorities for Section 8 coordination</li>
                <li>Lenders and appraisal services for financing</li>
                <li>Contractors and renovation specialists</li>
                <li>Veteran service organizations and VA offices</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>
                When required by law, such as:
              </p>
              <ul>
                <li>Court orders or subpoenas</li>
                <li>Government record requests</li>
                <li>Investigations of unlawful activity</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul>
                <li>Secure data transmission using SSL/TLS encryption</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Regular security audits and updates</li>
                <li>Secure storage of physical documents</li>
                <li>Safe disposal of information no longer needed</li>
              </ul>

              <h2>5. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to:
              </p>
              <ul>
                <li>Provide ongoing services and support</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain accurate business and tax records</li>
              </ul>

              <h2>6. Veterans' Rights</h2>
              <p>
                As a veteran-focused organization, we are committed to protecting your privacy
                and handling sensitive veteran information with the utmost care. Veteran status
                and service information is treated with additional confidentiality.
              </p>

              <h2>7. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of non-essential communications</li>
                <li>Request data portability</li>
              </ul>

              <h2>8. Contact Us</h2>
              <p>
                For questions about this privacy policy or to exercise your rights:
              </p>
              <ul>
                <li><strong>Email:</strong> privacy@properties4creation.com</li>
                <li><strong>Phone:</strong> (512) 555-0123</li>
                <li><strong>Address:</strong> Austin, Texas</li>
              </ul>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy to reflect changes in our practices or legal
                requirements. We will notify you of significant changes by posting the updated
                policy on our website.
              </p>

              <h2>10. Consent</h2>
              <p>
                By using our services or contacting us, you consent to the collection and use
                of your information as described in this policy. If you do not agree with this
                policy, please do not use our services or provide your information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
