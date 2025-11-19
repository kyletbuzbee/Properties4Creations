import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFunctions, httpsCallable } from 'firebase/functions';
import ReCAPTCHA from 'react-google-recaptcha';

// --- Types ---
type FormData = {
  name: string;
  email: string;
  phone: string;
  type: 'Seller' | 'Veteran' | 'Donor' | 'Partner';
  city: string;
  message: string;
};

// --- Configuration ---
// Replace with your actual reCAPTCHA Site Key (public)
const RECAPTCHA_SITE_KEY = "YOUR_PUBLIC_SITE_KEY";

const LeadForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const functions = getFunctions(); // Uses the project ID from your firebase config

  const onSubmit = async (data: FormData) => {
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submitLead = httpsCallable(functions, 'submitLead');

      // Call the Cloud Function
      await submitLead({
        ...data,
        recaptchaToken, // Pass token to backend for verification
      });

      setSubmitStatus('success');
      reset(); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-sand/30 p-8 rounded-xl shadow-card max-w-2xl mx-auto border border-brand-navy/10">
      <h2 className="text-3xl font-heading font-bold text-brand-navy mb-2">Get Involved</h2>
      <p className="text-brand-slate mb-8">
        Whether you're selling a property or a veteran looking for a home, we're here to help.
      </p>

      {submitStatus === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Message Received!</h3>
          <p>Thanks for reaching out. A member of our team will review your inquiry and contact you within 24 hours.</p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="mt-4 text-brand-navy font-semibold hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-navy mb-1">Full Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
                placeholder="John Doe"
              />
              {errors.name && <span className="text-brand-red text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-navy mb-1">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
                type="email"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-brand-red text-sm">{errors.email.message}</span>}
            </div>
          </div>

          {/* Row 2: Phone & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-navy mb-1">Phone (Optional)</label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
                placeholder="(512) 555-0123"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-brand-navy mb-1">City of Interest</label>
              <input
                {...register("city", { required: "City is required" })}
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
                placeholder="e.g. Austin, TX"
              />
              {errors.city && <span className="text-brand-red text-sm">{errors.city.message}</span>}
            </div>
          </div>

          {/* Row 3: Type Selection */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-brand-navy mb-1">I am a...</label>
            <select
              {...register("type", { required: "Please select an option" })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
            >
              <option value="">Select an option</option>
              <option value="Seller">Home Seller (Get Cash Offer)</option>
              <option value="Veteran">Veteran Buyer</option>
              <option value="Donor">Donor / Investor</option>
              <option value="Partner">Contractor / Partner</option>
            </select>
            {errors.type && <span className="text-brand-red text-sm">{errors.type.message}</span>}
          </div>

          {/* Row 4: Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-brand-navy mb-1">Message (Optional)</label>
            <textarea
              {...register("message")}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy"
              placeholder="Tell us about the property or your housing needs..."
            ></textarea>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
             <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
              />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </div>

          {submitStatus === 'error' && (
            <div className="text-center text-brand-red text-sm mt-2">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default LeadForm;
