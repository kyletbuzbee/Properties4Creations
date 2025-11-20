'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFunctions, httpsCallable } from 'firebase/functions';
import ReCAPTCHA from 'react-google-recaptcha';
import { functions } from '@/lib/firebase';

// --- Types ---
type HelpType = 'seller' | 'veteran' | 'partner';

type FormData = {
  helpType: HelpType;
  // Seller fields
  propertyType?: 'house' | 'condo' | 'townhouse' | 'land';
  condition?: 'excellent' | 'good' | 'fair' | 'poor' | 'fixer-upper';
  timeline?: 'asap' | '1-3months' | '3-6months' | '6months+';
  // Veteran fields
  hasVoucher?: 'yes' | 'no' | 'applying';
  householdSize?: number;
  accessibility?: string;
  preferredHousing?: 'any' | 'accessible' | 'affordable' | 'modern';
  // Partner fields
  partnerType?: 'contractor' | 'investor' | 'organization' | 'other';
  // Contact fields
  name: string;
  email: string;
  phone?: string;
  city: string;
  message?: string;
};

// --- Configuration ---
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const MultiStepLeadForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger
  } = useForm<FormData>();

  const helpType = watch('helpType');

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const onSubmit = async (data: FormData) => {
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA verification.");
      return;
    }

    // Validate reCAPTCHA token format
    if (recaptchaToken.length < 10) {
      setErrorMessage("Invalid reCAPTCHA verification. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const submitLead = httpsCallable(functions, 'submitLead');

      // Call the Cloud Function with proper error handling
      const result = await submitLead({
        ...data,
        recaptchaToken,
        timestamp: new Date().toISOString(),
        source: 'website_multi_step_form'
      });

      console.log('Form submission result:', result);

      setSubmitStatus('success');
      reset(); // Clear form
      setRecaptchaToken(null); // Reset reCAPTCHA
      setCurrentStep(1); // Reset to first step

    } catch (error: any) {
      console.error("Error submitting form:", error);

      // Handle specific Firebase Functions errors
      let errorMsg = "Something went wrong. Please try again or contact us directly.";

      if (error.code === 'functions/unauthenticated') {
        errorMsg = "Authentication error. Please try again.";
      } else if (error.code === 'functions/permission-denied') {
        errorMsg = "Permission denied. Please contact support.";
      } else if (error.code === 'functions/invalid-argument') {
        errorMsg = "Invalid form data. Please check your entries.";
      } else if (error.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
    setRecaptchaToken(null);
    reset();
    setCurrentStep(1);
  };

  // Step content components
  const Step1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">How can we help you?</h2>
        <p className="text-slate-600">Select what you're looking for and we'll guide you through the next steps.</p>
      </div>

      <div className="grid gap-4">
        {[
          {
            id: 'seller' as HelpType,
            title: 'Sell/Donate Property',
            description: 'Get a fair cash offer or donate your property for veterans',
            icon: '🏠'
          },
          {
            id: 'veteran' as HelpType,
            title: 'Find Veteran Housing',
            description: 'Section 8 support and renovated housing solutions',
            icon: '🇺🇸'
          },
          {
            id: 'partner' as HelpType,
            title: 'Partner With Us',
            description: 'Join our network of contractors and investors',
            icon: '🤝'
          }
        ].map((option) => (
          <label key={option.id} className="cursor-pointer">
            <input
              {...register("helpType", { required: "Please select an option" })}
              type="radio"
              value={option.id}
              className="sr-only"
            />
            <div className={`p-6 border-2 rounded-lg transition-all duration-200 ${
              helpType === option.id
                ? 'border-brand-teal bg-brand-teal/5 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{option.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-800">{option.title}</h3>
                  <p className="text-slate-600 text-sm">{option.description}</p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {errors.helpType && (
        <p className="mt-1 text-sm text-red-600">{errors.helpType.message}</p>
      )}
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Tell us more about your needs</h2>
        <p className="text-slate-600">Help us provide the most relevant assistance.</p>
      </div>

      {helpType === 'seller' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Property Type *
            </label>
            <select
              {...register("propertyType", { required: "Property type is required" })}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            >
              <option value="">Select property type</option>
              <option value="house">House</option>
              <option value="condo">Condominium</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
            </select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Current Condition *
            </label>
            <select
              {...register("condition", { required: "Property condition is required" })}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            >
              <option value="">Select condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="fixer-upper">Needs major repairs</option>
            </select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Timeline for Sale</label>
            <select
              {...register("timeline")}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            >
              <option value="">Select timeline</option>
              <option value="asap">As soon as possible</option>
              <option value="1-3months">Within 1-3 months</option>
              <option value="3-6months">Within 3-6 months</option>
              <option value="6months+">6+ months</option>
            </select>
          </div>
        </div>
      )}

      {helpType === 'veteran' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Do you have a Section 8 voucher? *
            </label>
            <select
              {...register("hasVoucher", { required: "This field is required" })}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            >
              <option value="">Select option</option>
              <option value="yes">Yes, I have an active voucher</option>
              <option value="applying">I'm currently applying</option>
              <option value="no">No, not yet</option>
            </select>
            {errors.hasVoucher && (
              <p className="mt-1 text-sm text-red-600">{errors.hasVoucher.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Household Size *
            </label>
            <input
              {...register("householdSize", {
                required: "Household size is required",
                valueAsNumber: true,
                min: { value: 1, message: "Must be at least 1" }
              })}
              type="number"
              min="1"
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
              placeholder="How many people in your household?"
            />
            {errors.householdSize && (
              <p className="mt-1 text-sm text-red-600">{errors.householdSize.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Accessibility Needs</label>
            <textarea
              {...register("accessibility")}
              rows={2}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
              placeholder="Any mobility or accessibility requirements? (Optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Housing Preferences</label>
            <select {...register("preferredHousing")}>
              <option value="any">No specific preference</option>
              <option value="accessible">Accessible housing</option>
              <option value="affordable">Most affordable option</option>
              <option value="modern">Modern amenities</option>
            </select>
          </div>
        </div>
      )}

      {helpType === 'partner' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Partnership Type *
            </label>
            <select
              {...register("partnerType", { required: "Partnership type is required" })}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            >
              <option value="">Select partnership type</option>
              <option value="contractor">Contractor/Construction Professional</option>
              <option value="investor">Real Estate Investor</option>
              <option value="organization">Non-profit Organization</option>
              <option value="other">Other</option>
            </select>
            {errors.partnerType && (
              <p className="mt-1 text-sm text-red-600">{errors.partnerType.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Contact Information</h2>
        <p className="text-slate-600">We'll get back to you within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name *
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address *
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            placeholder="(512) 555-0123"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            City of Interest *
          </label>
          <input
            {...register("city", { required: "City is required" })}
            type="text"
            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            placeholder="Austin, TX"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Additional Message
        </label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
          placeholder="Anything else you'd like us to know?"
        />
      </div>

      {/* reCAPTCHA */}
      <div className="flex justify-center">
        {RECAPTCHA_SITE_KEY ? (
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
            onExpired={() => setRecaptchaToken(null)}
            onError={() => setRecaptchaToken(null)}
          />
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-800 text-sm">
              reCAPTCHA configuration needed. Please contact support.
            </p>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{errorMessage}</p>
        </div>
      )}
    </div>
  );

  // Show success state
  if (submitStatus === 'success') {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-green-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Message Received Successfully!</h3>
          <p className="text-green-700 mb-6">
            Thank you for reaching out. A member of our Properties 4 Creation team will review your inquiry and contact you within 24 hours.
          </p>
          <button
            onClick={resetForm}
            className="inline-flex items-center px-4 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 transition-colors duration-200"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-slate-200" role="main" aria-labelledby="form-title">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep
                ? 'bg-brand-teal text-white'
                : 'bg-slate-200 text-slate-400'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${
                step < currentStep ? 'bg-brand-teal' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Get Involved</h1>
        <p className="text-slate-600">
          {currentStep === 1 && "Start by telling us how we can help"}
          {currentStep === 2 && "Help us understand your specific needs"}
          {currentStep === 3 && "Complete your contact information"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors duration-200"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-2 bg-brand-teal hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !recaptchaToken}
              className={`px-8 py-2 rounded-lg font-bold text-white transition-all duration-200 ${
                isSubmitting || !recaptchaToken
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          )}
        </div>

        {/* Privacy Notice */}
        <p className="text-xs text-slate-500 text-center">
          By submitting this form, you agree to our privacy policy.
          We'll never share your information without permission.
        </p>
      </form>
    </div>
  );
};

export default MultiStepLeadForm;
