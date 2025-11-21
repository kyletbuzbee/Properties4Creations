'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Section8InfoPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('3000');
  const [householdSize, setHouseholdSize] = useState('3');
  const [calculatedPayment, setCalculatedPayment] = useState<number | null>(null);

  const calculateVoucher = () => {
    const income = parseFloat(monthlyIncome);
    const size = parseInt(householdSize);

    if (isNaN(income) || isNaN(size) || income <= 0) {
      setCalculatedPayment(null);
      return;
    }

    // Section 8 typically caps tenant payment at 30% of income
    const tenantPayment = Math.round(income * 0.3 * 100) / 100;
    setCalculatedPayment(tenantPayment);
  };

  const eligibilityCriteria = [
    "Family income at or below 50% of area median income",
    "Employment status (active veterans, disabled, or receiving benefits)",
    "Veteran status and service records",
    "Local housing authority waiting list availability",
    "Household composition and size",
    "Criminal background check (varies by jurisdiction)"
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Contact Local Housing Authority",
      description: "Find and contact your local Public Housing Authority (PHA) to get on the Section 8 waitlist. This is the first step in the voucher program.",
      timeline: "Immediate - Can take 1-12+ months"
    },
    {
      step: 2,
      title: "Complete Application & Verification",
      description: "Submit application with proof of income, family composition, immigration status, and other required documentation.",
      timeline: "1-2 weeks"
    },
    {
      step: 3,
      title: "Get Voucher & Search for Housing",
      description: "Once issued a voucher, you have 60 days to find a Section 8 approved rental property within voucher payment standards.",
      timeline: "60 days (search period)"
    },
    {
      step: 4,
      title: "Property Approval & Lease",
      description: "Properties must pass Housing Quality Standards inspection. Once approved, you can sign a lease and move in.",
      timeline: "2-4 weeks"
    },
    {
      step: 5,
      title: "Move-In & Ongoing Compliance",
      description: "Begin subsidy payments to landlord. Annual recertifications ensure continued eligibility.",
      timeline: "Ongoing (annual reviews)"
    }
  ];

  const regionalVariations = [
    {
      region: "Texas",
      waitTime: "6-24 months",
      avgVoucher: "$800-1200",
      specialNotes: "Priority for veterans and families with children. Austin has longer waitlists than surrounding areas."
    },
    {
      region: "California",
      waitTime: "2-12 months",
      avgVoucher: "$1200-1800",
      specialNotes: "Higher voucher amounts but very competitive waitlists. Los Angeles and Bay Area have extensive voucher programs."
    },
    {
      region: "Florida",
      waitTime: "3-18 months",
      avgVoucher: "$700-1100",
      specialNotes: "Good voucher amounts with moderate wait times. Miami and Tampa have robust programs for veterans."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Section 8 Information & Eligibility
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-4xl mx-auto">
              Housing Choice Vouchers (Section 8) help eligible families, seniors, and veterans afford
              safe, decent housing in the private market. Learn how to qualify and navigate the program.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/projects?section8=true" className="bg-white text-brand-teal hover:bg-teal-50 px-6 py-3 rounded-lg font-medium transition-colors">
                Find Section 8 Properties
              </Link>
              <Link href="/get-started" className="border-2 border-white text-white hover:bg-white hover:text-brand-teal px-6 py-3 rounded-lg font-medium transition-colors">
                Connect with Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-6">What is Section 8?</h2>
              <p className="text-lg text-slate-700 mb-6">
                The Housing Choice Voucher program, commonly known as Section 8, is a rental assistance
                program run by the U.S. Department of Housing and Urban Development (HUD). It helps
                eligible families, veterans, seniors, and individuals afford housing in the private market.
              </p>
              <p className="text-slate-700 mb-8">
                Unlike public housing, Section 8 allows participants to choose any housing that meets HUD's
                Housing Quality Standards (HQS) and is within their voucher payment standard amount.
              </p>

              <div className="bg-brand-teal/10 border-l-4 border-brand-teal p-6 rounded-r-lg">
                <h3 className="font-semibold text-brand-navy mb-2">Key Benefits</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Pay only 30% of household income toward rent</li>
                  <li>• Landlord receives guaranteed rent payment from PHA</li>
                  <li>• Choice of housing in any neighborhood</li>
                  <li>• Mobility - can move with voucher intact</li>
                  <li>• No income limit hikes during assistance period</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-brand-navy mb-6">Program Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Families Assisted Nationwide</span>
                  <span className="font-semibold">5.2 million</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Veterans Receiving Assistance</span>
                  <span className="font-semibold">~300,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Average Monthly Subsidy</span>
                  <span className="font-semibold">$800-1,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Average Wait Time</span>
                  <span className="font-semibold">6-18 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Who Qualifies for Section 8?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Eligibility is determined by income, family composition, housing needs, and other factors
              evaluated by local housing authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibilityCriteria.map((criteria, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-brand-teal">
                <p className="text-slate-700">{criteria}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-brand-olive/10 border border-brand-olive/20 rounded-lg p-8">
            <h3 className="text-xl font-bold text-brand-navy mb-4">Special Veteran Provisions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Priority Eligibility</h4>
                <p className="text-slate-700">
                  Veterans with service-connected disabilities, those receiving VA benefits,
                  homeless veterans, and veterans recently separated from active duty
                  often receive priority placement on waitlists.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Supporting Documentation</h4>
                <p className="text-slate-700">
                  DD-214 discharge papers, VA disability letters, benefit statements,
                  and proof of service are commonly required for veteran applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Section 8 Application Process</h2>
            <p className="text-xl text-slate-600">
              Understanding the steps can help you prepare and reduce wait times
            </p>
          </div>

          <div className="space-y-6">
            {applicationSteps.map((step) => (
              <div key={step.step} className="bg-white rounded-lg p-6 shadow-card border-l-4 border-brand-teal">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-brand-navy">{step.title}</h3>
                      <span className="text-sm font-medium text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-slate-700">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Variations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Regional Program Variations</h2>
            <p className="text-xl text-slate-600">
              Section 8 programs vary by location due to different housing costs and local priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regionalVariations.map((region, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-brand-navy mb-4">{region.region}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-slate-600">Wait Time:</span>
                    <span className="ml-2">{region.waitTime}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600">Avg. Voucher:</span>
                    <span className="ml-2">{region.avgVoucher}/month</span>
                  </div>
                  <p className="text-slate-700 text-sm mt-4">{region.specialNotes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voucher Calculator */}
      <section className="py-16 bg-gradient-to-br from-brand-sage/10 to-brand-olive/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Section 8 Rent Calculator</h2>
            <p className="text-xl text-slate-600">
              Estimate your monthly tenant payment based on household income
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-card p-8 border border-slate-200">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-3">
                  Combined Monthly Gross Income ($)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none text-lg"
                  placeholder="3000"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Include all household members' income before taxes, garnishments, or deductions
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-3">
                  Household Size
                </label>
                <select
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-transparent outline-none text-lg"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? 'Person' : 'People'}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Number of people in your household
                </p>
              </div>
            </div>

            <button
              onClick={calculateVoucher}
              className="w-full bg-brand-sage hover:bg-brand-sage/90 text-white font-semibold py-3 rounded-lg transition-colors text-lg mb-8"
            >
              Calculate My Estimated Payment
            </button>

            {calculatedPayment !== null && (
              <div className="bg-gradient-to-br from-brand-sage/10 to-brand-olive/10 border-2 border-brand-sage rounded-lg p-8">
                <p className="text-slate-600 text-sm mb-2">Your estimated monthly tenant payment (30% of income):</p>
                <p className="text-5xl font-bold text-brand-sage mb-6">
                  ${calculatedPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="space-y-3 text-sm text-slate-700 bg-white p-6 rounded-lg">
                  <p>
                    <strong>What this means:</strong> You would pay approximately this amount toward rent each month with a Section 8 voucher. HUD would pay the landlord the remaining rent amount (up to the area payment standard).
                  </p>
                  <p className="text-xs text-slate-500 border-t pt-3">
                    *This is an estimate based on 30% of income. Actual payment depends on deductions (medical, childcare), family composition, utility responsibilities, and local PHA policies.
                  </p>
                  <p className="pt-3 border-t">
                    <strong>Austin Area Payment Standards:</strong> Vary by bedroom size ($1,200-$2,500+ for 1-4 bedroom units)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Terms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Important Section 8 Voucher Terms</h2>
            <p className="text-xl text-slate-600">
              Understanding these key terms will help you navigate the program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                term: 'Adjusted Gross Income (AGI)',
                definition: 'Total household income minus allowed deductions like medical expenses over 3% of income, childcare, and disability assistance.'
              },
              {
                term: 'Housing Choice Voucher',
                definition: 'Certificate issued by PHA that allows you to find and lease any HUD-approved unit at fair market rent within payment standards.'
              },
              {
                term: 'Tenant Payment',
                definition: 'Amount you pay landlord each month—typically 30% of adjusted gross income (minimum to maximum based on PHA rules).'
              },
              {
                term: 'HUD Subsidy Payment',
                definition: 'Federal government payment to landlord on your behalf, covering difference between your payment and actual rent.'
              },
              {
                term: 'Payment Standards',
                definition: 'Maximum rent amount HUD will reimburse in your area. Varies by unit bedroom size and location.'
              },
              {
                term: 'Housing Quality Standards (HQS)',
                definition: 'Federal safety and livability standards all Section 8 rental units must meet. Inspected annually.'
              },
              {
                term: 'Income Recertification',
                definition: 'Annual review process where PHA verifies current income and recalculates rent payment accordingly.'
              },
              {
                term: 'Lease-up Period',
                definition: 'Typically 120 days after receiving voucher to find approved housing. Extensions available in some cases.'
              },
              {
                term: 'Portability',
                definition: 'Ability to move your voucher to different PHA area after 1 year if you meet requirements and new PHA approves.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-brand-navy mb-2">{item.term}</h3>
                <p className="text-slate-600 text-sm">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Downloadable Resources</h2>
            <p className="text-xl text-slate-600">
              Print-ready checklists and forms to help you navigate the Section 8 process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Section 8 Application Checklist",
                description: "Complete list of required documents and information for your application",
                icon: "📋",
                size: "PDF (2.3 MB)"
              },
              {
                title: "Housing Authority Directory",
                description: "Find contact information for housing authorities in your area",
                icon: "📞",
                size: "PDF (1.8 MB)"
              },
              {
                title: "Housing Quality Standards Guide",
                description: "What your rental must pass during the inspection process",
                icon: "🏠",
                size: "PDF (3.1 MB)"
              },
              {
                title: "Veterans Benefits Summary",
                description: "How Section 8 works with other VA programs and benefits",
                icon: "🇺🇸",
                size: "PDF (2.7 MB)"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-card border border-slate-200">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{resource.icon}</span>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-brand-navy mb-2">{resource.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{resource.size}</span>
                      <button className="text-brand-teal hover:text-brand-teal/80 text-sm font-medium">
                        Download →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Common Questions</h2>
            <p className="text-xl text-slate-600">
              Answers to frequently asked questions about Section 8 programs
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Can I use my Section 8 voucher anywhere in the United States?",
                answer: "Yes, but portability allows moves to another PHA. You can move to another jurisdiction, but you must reside in the new area for at least one year unless you have tenant-based assistance with portability."
              },
              {
                question: "What happens if I find housing above my voucher amount?",
                answer: "You can negotiate with landlords, or they can accept the voucher value and you pay the difference. Some landlords will not accept vouchers for properties above fair market rent."
              },
              {
                question: "How often do I need to recertify my income?",
                answer: "Annual recertification is required to maintain eligibility and adjust rent portions. You must report changes in income, household composition within 30 days."
              },
              {
                question: "Can I use Section 8 while receiving other benefits?",
                answer: "Yes, Section 8 works well with SSI, SSDI, VA benefits, and other programs. Some income sources are excluded or calculated differently for eligibility."
              },
              {
                question: "What if the landlord refuses to accept my voucher?",
                answer: "All landlords must follow fair housing laws. Contact your PHA if you encounter discrimination. They can provide advocacy and assistance."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-brand-navy text-lg">
                  {faq.question}
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Apply for Section 8?</h2>
          <p className="text-xl mb-8">
            We can help connect you with Section 8 approved properties and provide guidance
            through the application process. Our team works directly with local housing authorities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-brand-teal hover:bg-brand-teal/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get Started Today
            </Link>
            <Link href="/projects?section8=true" className="border-2 border-white text-white hover:bg-white hover:text-brand-navy px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Browse Property Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
