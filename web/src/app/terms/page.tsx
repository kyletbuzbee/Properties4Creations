'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md-text-5xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-200 mb-8">
            Please read these terms carefully before using Properties 4 Creation services.
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

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Properties 4 Creation website and services, you accept
                and agree to be bound by the terms and provision of this agreement. If you do not
                agree to abide by the above, please do not use this service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Properties 4 Creation provides real estate evaluation, renovation, and housing
                services specifically focused on veteran housing needs. This includes property
                evaluations, renovation coordination, Section 8 housing assistance, and related
                services.
              </p>

              <h2>3. User Responsibilities</h2>
              <h3>Accuracy of Information</h3>
              <p>
                You agree to provide accurate, current, and complete information about yourself
                when using our services. You are responsible for maintaining the confidentiality
                of any account information and are fully responsible for all activities that occur
                under your account.
              </p>

              <h3>Legal Compliance</h3>
              <p>
                You agree to use our services in compliance with all applicable local, state,
                and federal laws, including housing discrimination laws, fair housing practices,
                and veteran service requirements.
              </p>

              <h3>Property Information</h3>
              <p>
                When submitting property information, you warrant that you have the legal right
                to provide such information and that all representations about the property are
                accurate to the best of your knowledge.
              </p>

              <h2>4. Service Terms</h2>
              <h3>Property Evaluations</h3>
              <p>
                Property evaluations are performed on a fee basis where applicable. Evaluations
                are advisory in nature and should not be relied upon as official appraisals
                without verification by certified appraisal professionals.
              </p>

              <h3>Renovation Services</h3>
              <p>
                All renovations are performed according to standard industry practices and local
                building codes. Properties 4 Creation is not responsible for unforeseen conditions
                discovered during renovation work.
              </p>

              <h3>Section 8 Coordination</h3>
              <p>
                We assist with Section 8 housing coordination but do not guarantee voucher approval
                or housing placement. Section 8 eligibility and availability are determined by
                local housing authorities.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                Properties 4 Creation shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or revenues, whether
                incurred directly or indirectly, or any loss of data, use, good-will, or other
                intangible losses resulting from:
              </p>
              <ul>
                <li>Your use of our services</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from our services</li>
                <li>Any bugs, viruses, trojan horses, or the like</li>
                <li>Any errors or omissions in any content or for any loss or damage</li>
              </ul>

              <h2>6. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Properties 4 Creation and its
                officers, directors, employees, and agents from and against any claims, actions,
                or demands, including without limitation reasonable legal and accounting fees,
                arising out of your use of our services or your breach of these terms.
              </p>

              <h2>7. Intellectual Property</h2>
              <p>
                The Properties 4 Creation website and service contain material which is owned by
                or licensed to us. This material includes, but is not limited to, the design,
                layout, look, appearance, and graphics. You may not reproduce, distribute,
                display, or create derivative works of our intellectual property without prior
                written consent.
              </p>

              <h2>8. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also
                governs your use of our services, to understand our practices.
              </p>

              <h2>9. Termination</h2>
              <p>
                We may terminate or suspend your access to our services immediately, without prior
                notice or liability, for any reason whatsoever, including without limitation if
                you breach the Terms. Upon termination, your right to use the service will cease
                immediately.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the State of Texas,
                without regard to conflict of law provisions. Our failure to enforce any right
                or provision of these Terms will not be considered a waiver of those rights.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms
                at any time. If a revision is material, we will try to provide at least 30 days
                notice prior to any new terms taking effect. What constitutes a material change
                will be determined at our sole discretion.
              </p>

              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> legal@properties4creation.com</li>
                <li><strong>Phone:</strong> (512) 555-0123</li>
                <li><strong>Address:</strong> Austin, Texas</li>
              </ul>

              <h2>13. Entire Agreement</h2>
              <p>
                These Terms of Service and Privacy Policy constitute the entire agreement between
                you and Properties 4 Creation and govern your use of the service, superseding any
                prior agreements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
