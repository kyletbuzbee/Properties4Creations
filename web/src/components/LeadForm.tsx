import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFunctions, httpsCallable } from 'firebase/functions';
import ReCAPTCHA from 'react-google-recaptcha';
import { functions } from '@/lib/firebase';

// --- Types ---
type FormData = {
  name: string;
  email: string;
  phone?: string;
  type: 'Seller' | 'Veteran' | 'Donor' | 'Partner';
  city: string;
  message?: string;
};

// --- Configuration ---
// Use environment variable for reCAPTCHA site key
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const LeadForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch 
  } = useForm<FormData>({
    defaultValues: {
      type: undefined
    }
  });

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
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
        source: 'website_form'
      });

      console.log('Form submission result:', result);
      
      setSubmitStatus('success');
      reset(); // Clear form
      setRecaptchaToken(null); // Reset reCAPTCHA
      
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
  };

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
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-slate-200">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Get Involved</h2>
        <p className="text-slate-600">
          Whether you're selling a property or a veteran looking for a home, we're here to help. 
          Complete the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name *
            </label>
            <input
              {...register("name", { 
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" }
              })}
              type="text"
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
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

        {/* Row 2: Phone & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              {...register("phone", {
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Invalid phone number format"
                }
              })}
              type="tel"
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
              placeholder="(512) 555-0123"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-2">
              City of Interest *
            </label>
            <input
              {...register("city", { 
                required: "City is required",
                minLength: { value: 2, message: "City must be at least 2 characters" }
              })}
              type="text"
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
              placeholder="Austin, TX"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* Row 3: Type Selection */}
        <div>
          <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-2">
            I am a... *
          </label>
          <select
            {...register("type", { required: "Please select an option" })}
            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
          >
            <option value="">Select an option</option>
            <option value="Seller">🏠 Home Seller (Get Cash Offer)</option>
            <option value="Veteran">🇺🇸 Veteran Buyer</option>
            <option value="Donor">💰 Donor / Investor</option>
            <option value="Partner">🔧 Contractor / Partner</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        {/* Row 4: Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
            Message
          </label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 px-3 py-2"
            placeholder="Tell us about the property or your housing needs..."
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

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || !recaptchaToken}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-all duration-200 ${
              isSubmitting || !recaptchaToken
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-red-200'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </button>
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

