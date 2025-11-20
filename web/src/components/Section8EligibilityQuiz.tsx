'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  text: string;
  yesText: string;
  noText: string;
}

const questions: Question[] = [
  {
    id: 'veteran',
    text: 'Are you a veteran or surviving spouse?',
    yesText: 'Yes, I served in the military',
    noText: 'No, I have not served'
  },
  {
    id: 'income',
    text: 'Is your household income below 50% of the area median?',
    yesText: 'Yes, my income qualifies',
    noText: 'No, my income is higher'
  },
  {
    id: 'documents',
    text: 'Do you have honorable discharge papers (DD-214)?',
    yesText: 'Yes, I have my DD-214',
    noText: 'No, or unsure'
  }
];

const Section8EligibilityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
  };

  const getEligibilityResult = () => {
    // Simple logic: if they're a veteran and say income qualifies OR have documents
    const isVeteran = answers[0];
    const incomeQualifies = answers[1];
    const hasDocuments = answers[2];

    const likelyEligible = isVeteran && (incomeQualifies || hasDocuments);

    return likelyEligible;
  };

  const progressPercentage = ((currentQuestion + (isComplete ? 1 : 0)) / questions.length) * 100;

  if (isComplete) {
    const likelyEligible = getEligibilityResult();

    return (
      <div className="bg-white rounded-lg shadow-card p-8 border border-slate-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-brand-navy mb-2">
            Eligibility Assessment Complete
          </h3>
        </div>

        {likelyEligible ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Likely Eligible for Section 8
            </div>
            <p className="text-slate-700 mb-6">
              Based on your responses, you appear to meet several key eligibility requirements for Section 8 housing assistance.
              Use our voucher calculator to see how much you could save on housing costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/resources/voucher-calculator?veteran=true"
                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🧮 Calculate Your Savings
                <span>→</span>
              </Link>
              <Link
                href="/get-started?type=veteran"
                className="inline-flex items-center gap-2 border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Application
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Help
              </Link>
            </div>

            {/* Veteran Benefits Callout */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">🎖️ Special Veteran Benefits</h4>
              <p className="text-blue-800 text-sm">
                As a veteran, you may qualify for priority placement and could be exempt from some income limits.
                Veterans Affairs Supportive Housing (VASH) vouchers are specifically designed for veterans and their families.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Further Evaluation Needed
            </div>
            <p className="text-slate-700 mb-6">
              While this quick assessment suggests you may not meet all Section 8 requirements, many veterans
              still qualify through alternative programs or special considerations. Let's schedule a consultation
              to review your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started?type=veteran"
                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Veteran Housing Options
                <span>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Schedule Free Consultation
              </Link>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={resetQuiz}
            className="text-brand-slate hover:text-brand-navy text-sm underline"
          >
            Take the quiz again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-card p-8 border border-slate-200">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-brand-teal h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-brand-navy mb-4">
          {questions[currentQuestion].text}
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-300 text-green-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {questions[currentQuestion].yesText}
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-300 text-red-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {questions[currentQuestion].noText}
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center text-sm text-slate-600">
        <p className="mb-2">
          This is a preliminary assessment tool. Results are not official eligibility determinations.
        </p>
        <p>
          For official Section 8 qualification, contact your local Public Housing Authority.
        </p>
      </div>
    </div>
  );
};

export default Section8EligibilityQuiz;
