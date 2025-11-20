'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock analytics data
const mockAnalytics = {
  overview: {
    propertiesManaged: 12,
    totalRevenue: 245000,
    occupancyRate: 94.2,
    averageRating: 4.8
  },
  monthlyRevenue: [
    { month: 'Jan', amount: 18500 },
    { month: 'Feb', amount: 21000 },
    { month: 'Mar', amount: 23200 },
    { month: 'Apr', amount: 24800 },
    { month: 'May', amount: 26100 },
    { month: 'Jun', amount: 27200 },
    { month: 'Jul', amount: 28500 },
    { month: 'Aug', amount: 29800 },
    { month: 'Sep', amount: 31200 },
    { month: 'Oct', amount: 28500 },
    { month: 'Nov', amount: 29500 },
    { month: 'Dec', amount: 30200 }
  ],
  topProperties: [
    { id: '1', address: '123 Main St, Austin', revenue: 28500, occupancy: 98.5, rating: 4.9 },
    { id: '2', address: '456 Oak Ave, Austin', revenue: 26100, occupancy: 96.2, rating: 4.7 },
    { id: '3', address: '789 Pine Rd, Austin', revenue: 23900, occupancy: 97.8, rating: 4.8 }
  ],
  recentActivity: [
    { id: '1', type: 'lease_signed', property: '123 Main St', tenant: 'John Doe', amount: 2200, date: '2024-11-15' },
    { id: '2', type: 'maintenance_completed', property: '456 Oak Ave', description: 'HVAC repair', amount: 850, date: '2024-11-14' },
    { id: '3', type: 'lease_renewal', property: '789 Pine Rd', tenant: 'Jane Smith', amount: 2100, date: '2024-11-13' },
    { id: '4', type: 'new_tenant', property: '321 Elm St', tenant: 'Bob Wilson', amount: 2350, date: '2024-11-12' }
  ]
};

const PartnerDashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('12months');
  const maxRevenue = Math.max(...mockAnalytics.monthlyRevenue.map(d => d.amount));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-brand-navy">Property Management Dashboard</h1>
                <p className="text-slate-600 mt-1">Monitor your investment performance and property operations</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                >
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="12months">Last 12 Months</option>
                  <option value="24months">Last 24 Months</option>
                </select>
                <Link
                  href="/portal/partner/properties"
                  className="bg-brand-navy text-white px-4 py-2 rounded-lg hover:bg-brand-navy/90 transition-colors text-sm font-medium"
                >
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Properties Managed</p>
                <p className="text-3xl font-bold text-brand-navy">{mockAnalytics.overview.propertiesManaged}</p>
              </div>
              <div className="p-3 bg-brand-navy/10 rounded-full">
                <svg className="w-6 h-6 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600">${(mockAnalytics.overview.totalRevenue / 12).toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Occupancy Rate</p>
                <p className="text-3xl font-bold text-blue-600">{mockAnalytics.overview.occupancyRate}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Average Rating</p>
                <p className="text-3xl font-bold text-yellow-600">{mockAnalytics.overview.averageRating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-brand-navy mb-6">Revenue Trend</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {mockAnalytics.monthlyRevenue.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-brand-navy to-brand-cocoa rounded-t"
                    style={{ height: `${(data.amount / maxRevenue) * 200}px` }}
                  ></div>
                  <span className="text-xs text-slate-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Properties */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-brand-navy mb-6">Top Performing Properties</h3>
            <div className="space-y-4">
              {mockAnalytics.topProperties.map((property) => (
                <div key={property.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-brand-navy text-sm">{property.address}</p>
                    <span className="text-green-600 font-semibold">${property.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span>{property.occupancy}% occupied</span>
                    <div className="flex items-center gap-1">
                      <span>{property.rating}</span>
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-brand-navy mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {mockAnalytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'lease_signed' ? 'bg-green-100' :
                      activity.type === 'maintenance_completed' ? 'bg-blue-100' :
                      activity.type === 'lease_renewal' ? 'bg-purple-100' : 'bg-orange-100'
                    }`}>
                      <svg className={`w-4 h-4 ${
                        activity.type === 'lease_signed' ? 'text-green-600' :
                        activity.type === 'maintenance_completed' ? 'text-blue-600' :
                        activity.type === 'lease_renewal' ? 'text-purple-600' : 'text-orange-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {activity.type === 'lease_signed' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        {activity.type === 'maintenance_completed' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                        {activity.type === 'lease_renewal' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                        {activity.type === 'new_tenant' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />}
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-brand-navy capitalize">
                        {activity.type.replace('_', ' ')}
                        {activity.tenant && ` - ${activity.tenant}`}
                      </p>
                      <p className="text-sm text-slate-600">{activity.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="font-semibold text-green-600">${activity.amount.toLocaleString()}</p>
                    )}
                    <p className="text-xs text-slate-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/portal/partner/properties"
            className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-brand-navy mb-2">Manage Properties</h3>
            <p className="text-slate-600 text-sm">Update property details, maintenance requests, and tenant information.</p>
          </Link>

          <Link
            href="/portal/partner/analytics"
            className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-brand-navy mb-2">Advanced Analytics</h3>
            <p className="text-slate-600 text-sm">Detailed reporting, ROI analysis, and market insights.</p>
          </Link>

          <Link
            href="/portal/partner/support"
            className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-brand-navy mb-2">Get Support</h3>
            <p className="text-slate-600 text-sm">Contact our team for property management assistance and guidance.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardPage;
