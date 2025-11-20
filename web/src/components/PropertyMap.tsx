// Lightweight PropertyMap placeholder for static builds.
'use client';

import React from 'react';

interface PropertyMapProps {
  projects: any[];
  onProjectClick?: (project: any) => void;
  selectedProjectId?: string | null;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] bg-slate-50 rounded-lg border border-slate-200 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-brand-navy">Property Map (Static)</h3>
          <p className="text-sm text-slate-600">Interactive maps are disabled for static exports. Use the list view to explore properties.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p: any) => (
            <button
              key={p.id}
              onClick={() => onProjectClick?.(p)}
              className="text-left p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <div className="text-sm font-medium text-brand-navy">{p.title || p.city || 'Property'}</div>
              <div className="text-xs text-slate-500">{p.city || '—'}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
