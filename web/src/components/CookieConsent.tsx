'use client';

import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    const consentDate = localStorage.getItem('cookieConsentDate');

    if (!consent) {
      setShowBanner(true);
    } else if (consentDate) {
      // Check if consent is older than 6 months (GDPR requirement)
      const consentTimestamp = parseInt(consentDate);
      const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);

      if (consentTimestamp < sixMonthsAgo) {
        setShowBanner(true);
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentDate');
      }
    }
  }, []);

  const acceptAllCookies = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setShowBanner(false);
  };

  const acceptNecessaryOnly = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setShowBanner(false);
  };

  const saveCustomPreferences = () => {
    saveConsent(preferences);
    setShowBanner(false);
  };

  const saveConsent = (consent: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    localStorage.setItem('cookieConsentDate', Date.now().toString());

    // Here you would implement cookie management logic
    // For example, enabling/disabling Google Analytics based on consent
    if (consent.analytics) {
      // Enable Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
      }
    } else {
      // Disable Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    }

    if (consent.marketing) {
      // Enable marketing cookies
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          ad_storage: 'granted',
        });
      }
    }
  };

  const openPreferences = () => {
    // You could implement a more detailed preferences modal here
    alert('Cookie preferences panel - currently simplified for this demo');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              We use cookies to enhance your experience
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We use cookies to provide necessary website functionality, improve your experience,
              and analyze our site traffic. By clicking "Accept All", you consent to all cookies.
              You can manage your preferences by selecting "Cookie Settings".
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
            <button
              onClick={openPreferences}
              className="px-4 py-2 text-sm font-medium text-brand-navy border border-brand-navy rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
            >
              Cookie Settings
            </button>
            <button
              onClick={acceptNecessaryOnly}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Necessary Only
            </button>
            <button
              onClick={acceptAllCookies}
              className="px-6 py-2 text-sm font-medium text-white bg-brand-red rounded-lg hover:bg-red-600 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          <a href="/privacy" className="hover:text-gray-700 underline">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/terms" className="hover:text-gray-700 underline">
            Terms of Service
          </a>
          <span>•</span>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
