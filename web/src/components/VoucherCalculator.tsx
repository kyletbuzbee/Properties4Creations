'use client';

import React, { useState, useCallback, useEffect } from 'react';

const VoucherCalculator: React.FC = () => {
  const [householdSize, setHouseholdSize] = useState(2);
  const [income, setIncome] = useState(25000);
  const [voucherType, setVoucherType] = useState('standard');
  const [savedCalculations, setSavedCalculations] = useState<any[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [currentCalculationId, setCurrentCalculationId] = useState<string | null>(null);

  // Load saved calculations and handle URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load saved calculations from localStorage
      const saved = localStorage.getItem('voucher-calculations');
      if (saved) {
        try {
          setSavedCalculations(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved calculations');
        }
      }

      // Check for URL parameters to load shared calculation
      const urlParams = new URLSearchParams(window.location.search);
      const shareId = urlParams.get('share');
      const veteranParam = urlParams.get('veteran');

      if (shareId) {
        try {
          const decodedData = JSON.parse(atob(shareId));
          setHouseholdSize(decodedData.householdSize || 2);
          setIncome(decodedData.income || 25000);
          setVoucherType(decodedData.voucherType || 'standard');
          setCurrentCalculationId(decodedData.id || null);
        } catch (e) {
          console.error('Invalid share link');
        }
      }

      // Set VASH voucher type for veterans
      if (veteranParam && !shareId) {
        setVoucherType('vash');
      }
    }
  }, []);

  // Generate unique ID for calculations
  const generateCalculationId = () => {
    return `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Save current calculation
  const saveCalculation = () => {
    if (typeof window !== 'undefined') {
      const calculation = {
        id: currentCalculationId || generateCalculationId(),
        householdSize,
        income,
        voucherType,
        result: calculateAffordability(),
        savedAt: new Date().toISOString(),
        name: `Household of ${householdSize} - $${income.toLocaleString()} income`
      };

      const existingIndex = savedCalculations.findIndex(calc => calc.id === calculation.id);
      const updatedCalculations = existingIndex >= 0
        ? savedCalculations.map(calc => calc.id === calculation.id ? calculation : calc)
        : [...savedCalculations, calculation];

      setSavedCalculations(updatedCalculations);
      setCurrentCalculationId(calculation.id);
      localStorage.setItem('voucher-calculations', JSON.stringify(updatedCalculations));
      setShowSaveDialog(false);
      alert('Calculation saved successfully!');
    }
  };

  // Generate shareable URL
  const generateShareUrl = () => {
    const shareData = { householdSize, income, voucherType, id: currentCalculationId };
    const encodedData = btoa(JSON.stringify(shareData));
    return `${window.location.origin}${window.location.pathname}?share=${encodedData}`;
  };

  // Copy share URL to clipboard
  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(generateShareUrl());
      alert('Share link copied to clipboard!');
    } catch (e) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateShareUrl();
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Share link copied to clipboard!');
      } catch (err) {
        alert('Failed to copy URL. Please copy it manually: ' + generateShareUrl());
      }
      document.body.removeChild(textArea);
    }
  };

  // Export calculation as PDF (basic print-to-PDF)
  const exportAsPDF = () => {
    const result = calculateAffordability();
    // Create a print-friendly document
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Section 8 Voucher Calculation</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .result { display: flex; justify-content: space-between; margin: 20px 0; }
              .summary { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Section 8 Voucher Affordability Calculator</h1>
              <p>Calculation Results - ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="result">
              <div><strong>Household Size:</strong> ${householdSize}</div>
              <div><strong>Annual Income:</strong> $${income.toLocaleString()}</div>
            </div>
            <div class="result">
              <div><strong>Voucher Type:</strong> ${voucherType}</div>
              <div><strong>Market Rent:</strong> $${result.marketRent}</div>
            </div>
            <div class="summary">
              <h3>Your Monthly Housing Cost Breakdown</h3>
              <p><strong>You Pay:</strong> $${result.tenantPortion} (30% of income)</p>
              <p><strong>Section 8 Covers:</strong> $${result.monthlySubsidy} (${result.savingsPercentage}% savings)</p>
              <p><strong>Annual Savings:</strong> $${result.annualSubsidy.toLocaleString()}</p>
            </div>
            <div style="text-align: center; margin-top: 40px; color: #666; font-size: 12px;">
              Generated by Properties 4 Creation | properties4creation.com
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const calculateAffordability = useCallback(() => {
    // Texas Section 8 base rent amounts (realistic approximations)
    const baseRents = {
      1: 750, 2: 900, 3: 1050, 4: 1200, 5: 1350, 6: 1500, 7: 1650, 8: 1800
    };

    const baseRent = baseRents[householdSize as keyof typeof baseRents] || 750;
    const tenantPortion = Math.max(100, (income * 0.30) / 12); // 30% of income
    const subsidy = Math.max(0, baseRent - tenantPortion);
    const savingsPercentage = subsidy > 0 ? Math.round((subsidy / baseRent) * 100) : 0;

    return {
      marketRent: baseRent,
      tenantPortion: Math.round(tenantPortion),
      monthlySubsidy: subsidy,
      annualSubsidy: subsidy * 12,
      savingsPercentage,
      canAfford: tenantPortion <= (income / 12) * 0.3
    };
  }, [householdSize, income, voucherType]);

  const result = calculateAffordability();

  const DonutChart = ({ tenantPortion, subsidy }: { tenantPortion: number; subsidy: number }) => {
    const total = tenantPortion + subsidy;
    const tenantAngle = (tenantPortion / total) * 360;
    const subsidyAngle = (subsidy / total) * 360;

    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Tenant Portion */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="30"
            strokeDasharray={`${tenantAngle} ${360 - tenantAngle}`}
            transform="rotate(-90 100 100)"
          />
          {/* Subsidy Portion */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#0f766e"
            strokeWidth="30"
            strokeDasharray={`${subsidyAngle} ${360 - subsidyAngle}`}
            transform={`rotate(${-90 + tenantAngle} 100 100)`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-4xl font-bold text-brand-teal">
            ${Math.round(tenantPortion + subsidy)}
          </span>
          <span className="text-sm text-gray-600">Monthly Rent</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-brand-navy mb-4">
          Section 8 Voucher Affordability Calculator
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See exactly how affordable veteran housing can be with Section 8 vouchers.
          Adjust your household size and income to see your potential monthly costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-brand-navy mb-3">
                Household Size: {householdSize}
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={householdSize}
                onChange={(e) => setHouseholdSize(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 person</span>
                <span>8+ people</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-brand-navy mb-3">
                Annual Income: ${income.toLocaleString()}
              </label>
              <input
                type="range"
                min="12000"
                max="75000"
                step="1000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$12k</span>
                <span>$75k+</span>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voucher Type
              </label>
              <select
                value={voucherType}
                onChange={(e) => setVoucherType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent"
              >
                <option value="standard">Standard Section 8</option>
                <option value="vash">VASH (Veterans Affairs)</option>
                <option value="special">Special Needs Voucher</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Calculator Options</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={saveCalculation}
                className="w-full bg-brand-navy text-white px-4 py-3 rounded-lg hover:bg-brand-navy/90 transition-colors font-medium"
              >
                Save Calculation
              </button>
              <button
                onClick={copyShareUrl}
                className="w-full bg-brand-cocoa text-white px-4 py-3 rounded-lg hover:bg-brand-cocoa/90 transition-colors font-medium"
              >
                Generate Share Link
              </button>
              <button
                onClick={exportAsPDF}
                className="w-full bg-brand-tan text-white px-4 py-3 rounded-lg hover:bg-brand-tan/90 transition-colors font-medium"
              >
                Export Report
              </button>
            </div>
            {currentCalculationId && (
              <p className="text-sm text-gray-600 mt-3">
                Current session saved
              </p>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-brand-navy/5 border border-brand-navy/20 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-brand-navy mb-3">Important Notes</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Calculations are estimates and may vary by location</li>
              <li>• You typically pay 30% of your income toward rent</li>
              <li>• Section 8 covers the difference up to Fair Market Rent</li>
              <li>• Additional fees for utilities may apply</li>
              <li>• Speak with a housing counselor for personalized guidance</li>
            </ul>
          </div>
        </div>

        {/* Results Donut Chart */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-center text-brand-navy">
            Your Monthly Housing Cost Breakdown
          </h3>

          <DonutChart tenantPortion={result.tenantPortion} subsidy={result.monthlySubsidy} />

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-navy mb-1">
                ${result.tenantPortion}
              </div>
              <div className="text-sm text-gray-600">You Pay</div>
              <div className="text-xs text-gray-500 mt-1">(30% of income)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-teal mb-1">
                ${result.monthlySubsidy}
              </div>
              <div className="text-sm text-gray-600">Section 8 Covers</div>
              <div className="text-xs text-gray-500 mt-1">({result.savingsPercentage}% savings)</div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-green-800 mb-2">
                Annual Savings: ${result.annualSubsidy.toLocaleString()}
              </h4>
              <p className="text-sm text-green-700">
                {result.canAfford
                  ? `You're eligible! This could save your family $${result.annualSubsidy.toLocaleString()} per year.`
                  : "Contact us to explore additional support options."
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 bg-gradient-to-r from-brand-teal to-brand-olive p-8 rounded-2xl text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Apply for Section 8?</h3>
        <p className="text-lg mb-6 opacity-90">
          Our veteran-focused team can help you navigate the voucher process and find the perfect home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/resources/section8"
            className="bg-white text-brand-teal hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-block"
          >
            Learn More About Section 8
          </a>
          <a
            href="/get-started"
            className="border-2 border-white text-white hover:bg-white hover:text-brand-teal px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-block"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default VoucherCalculator;
