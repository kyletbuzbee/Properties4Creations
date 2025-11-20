import React from 'react';

interface HousingProgramsBlockProps {
  veteranFocus: boolean;
  section8Eligible?: boolean;
  typicalRentRange?: string;
  accessibilityFeatures?: string[];
  unitCount?: number;
}

const HousingProgramsBlock: React.FC<HousingProgramsBlockProps> = ({
  veteranFocus,
  section8Eligible = false,
  typicalRentRange,
  accessibilityFeatures = [],
  unitCount
}) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-card border border-slate-200">
      <h3 className="text-2xl font-bold text-brand-navy mb-6">Program Eligibility and Housing Options</h3>

      {/* Veteran Focus Badge */}
      <div className="flex items-center gap-2 mb-6">
        {veteranFocus && (
          <span className="inline-flex items-center px-4 py-2 text-lg font-medium bg-brand-olive text-white rounded-full shadow-sm">
            <span className="text-lg mr-2">🇺🇸</span>
            Veteran-Focused Property
          </span>
        )}
        {section8Eligible && (
          <span className="inline-flex items-center px-4 py-2 text-lg font-medium bg-brand-teal text-white rounded-full shadow-sm">
            <span className="text-lg mr-2">🏠</span>
            Section 8 Approved
          </span>
        )}
      </div>

      {/* Program Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 8 Housing Details */}
        <div className="bg-brand-beige/10 border border-brand-beige/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-beige rounded-full flex items-center justify-center">
              <span className="text-xl text-brand-navy">🏠</span>
            </div>
            <h4 className="text-lg font-semibold text-brand-navy">Affordable Housing</h4>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
              section8Eligible
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              <span className="text-xs mr-1">●</span>
              {section8Eligible ? 'Section 8 Ready' : 'Market Rate Available'}
            </span>
          </div>
          <p className="text-slate-700 mb-3">
            Quality housing designed for livability and comfort. Section 8 vouchers make beautiful homes affordable for qualified renters.
          </p>
          {section8Eligible && typicalRentRange && (
            <div className="bg-white p-3 rounded-lg border border-brand-beige/50">
              <p className="text-sm font-medium text-brand-navy">
                With Section 8: {typicalRentRange} (typically 70-80% less than market rate)
              </p>
            </div>
          )}
          {!section8Eligible && typicalRentRange && (
            <p className="text-sm font-medium text-brand-navy">
              Market rate range: {typicalRentRange}
            </p>
          )}
        </div>

        {/* Veteran Support Details */}
        <div className="bg-brand-sage/10 border border-brand-sage/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-sage rounded-full flex items-center justify-center">
              <span className="text-xl text-white">🇺🇸</span>
            </div>
            <h4 className="text-lg font-semibold text-brand-navy">Veteran Support</h4>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
              veteranFocus
                ? 'bg-blue-100 text-blue-800'
                : 'bg-slate-100 text-slate-700'
            }`}>
              <span className="text-xs mr-1">●</span>
              {veteranFocus ? 'Veteran Priority' : 'Veterans Welcome'}
            </span>
          </div>
          <p className="text-slate-700 mb-3">
            All veterans receive priority support. Veteran-focused properties include additional comfort and service features.
          </p>
          {veteranFocus && (
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Service-connected priority placement</li>
              <li>• Military lifestyle understanding</li>
              <li>• Flexible arrangements available</li>
              <li>• Extra amenities for comfort</li>
            </ul>
          )}
        </div>
      </div>

      {/* Additional Property Details */}
      {(unitCount || accessibilityFeatures.length > 0) && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unit Information */}
          {unitCount && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="text-2xl">🏢</span>
              </div>
              <div>
                <p className="font-semibold text-brand-navy">{unitCount} Unit{unitCount !== 1 ? 's' : ''}</p>
                <p className="text-sm text-slate-600">
                  {unitCount === 1
                    ? 'Single-family unit'
                    : `${unitCount > 4 ? 'Multi-unit property' : 'Small multi-unit property'}`
                  }
                </p>
              </div>
            </div>
          )}

          {/* Accessibility Features */}
          {accessibilityFeatures.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">♿</span>
                <span className="font-semibold text-brand-navy">Accessibility Features</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {accessibilityFeatures.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-brand-navy/10 text-brand-navy rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-brand-navy hover:bg-brand-navy/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Apply for This Property
          </button>
          <button className="flex-1 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Schedule Property Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default HousingProgramsBlock;
