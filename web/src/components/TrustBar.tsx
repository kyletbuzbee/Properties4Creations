'use client';

import React from 'react';

const PressPartnersStrip: React.FC = () => {
  const partners = [
    {
      name: 'KVUE Austin News',
      logo: '/logos/kvue-logo.png', // Grayscale version for consistent look
      type: 'media',
      description: 'Local news coverage of veteran housing initiatives'
    },
    {
      name: 'Austin American-Statesman',
      logo: '/logos/statesman-logo.png',
      type: 'media',
      description: 'Regional press on housing policy and veteran support'
    },
    {
      name: 'Texas Veterans Alliance',
      logo: '/logos/texas-veterans-alliance-logo.png',
      type: 'partnership',
      description: 'Official partnership with state veteran advocacy group'
    },
    {
      name: 'Austin Habitat for Humanity',
      logo: '/logos/habitat-austin-logo.png',
      type: 'partnership',
      description: 'Collaborative housing construction and community development'
    },
    {
      name: 'Texas Workforce Commission',
      logo: '/logos/twc-logo.png',
      type: 'partnership',
      description: 'Veteran workforce development and housing support'
    },
    {
      name: 'AVSO Certified',
      logo: '/logos/avso-logo.png',
      type: 'certification',
      description: 'Accredited Veteran Service Organization certification'
    }
  ];

  const PlaceholderLogo = ({ name, type }: { name: string; type: string }) => {
    const getEmoji = () => {
      switch (type) {
        case 'media': return '📰';
        case 'partnership': return '🤝';
        case 'certification': return '✅';
        default: return '🏢';
      }
    };

    return (
      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shadow-md border border-white/20">
        <span className="text-2xl">{getEmoji()}</span>
      </div>
    );
  };

  return (
    <section className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-center text-gray-600 mb-6 font-medium">
          As Featured In & Partnered With
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 hover:opacity-90 transition-opacity duration-500">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105"
              title={partner.description}
            >
              <PlaceholderLogo name={partner.name} type={partner.type} />
              <span className="text-xs text-gray-700 text-center font-medium max-w-24 leading-tight group-hover:text-brand-teal transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Credibility Statement */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm font-medium">
            Veteran-Owned • Chamber Certified • Licensed Real Estate Professionals • Equal Housing Opportunity
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-green-500">●</span>
              BBB Accredited A+
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">●</span>
              Licensed & Bonded
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">●</span>
              500+ Veterans Served
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressPartnersStrip;
