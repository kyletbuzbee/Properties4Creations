'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section8Badge from './Section8Badge';

interface ProjectCardProps {
  project: {
    id: string;
    slug: string;
    title: string;
    city: string;
    description: string;
    budget_range: string;
    veteran_focus: boolean;
    section8_eligible?: boolean;
    typical_rent_range?: string;
    accessibility_features?: string[];
    featured_image_url?: string;
    before_image_url?: string;
    after_image_url?: string;
    progress_percentage?: number;
    status?: 'planning' | 'active' | 'completed' | 'cancelled';
    impact_badges?: string[];
    tags?: string[];
    market_value?: string;
    voucher_cost?: string;
    sq_footage?: number;
    bedrooms?: number;
    bathrooms?: number;
  };
  showSection8Filter?: boolean;
}

// Emotional taglines based on property features
const getEmotionalTagline = (project: any) => {
  if (project.accessibility_features?.includes('Ramp Access')) {
    return "A fully accessible sanctuary designed for mobility and peace.";
  }
  if (project.veteran_focus) {
    return "Restored specifically for those who served our country with honor.";
  }
  if (project.section8_eligible) {
    return "A beautiful home that welcomes veterans and families with open arms.";
  }
  return "A warm, inviting home where families find their fresh start.";
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, showSection8Filter = false }) => {
  const emotionalTagline = getEmotionalTagline(project);
  const afterImageUrl = project.after_image_url || project.featured_image_url || '/placeholders/house-placeholder.jpg';

  return (
    <div className="group bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 overflow-hidden flex flex-col">

      {/* Transformation Image (Top Section - Hero Image Only) */}
      <div className="relative h-64 w-full bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
        <Image
          src={afterImageUrl}
          alt="Restored Veteran Home"
          fill
          className="object-cover"
        />

        {/* Dignity Badge - Prominently Placed */}
        {project.section8_eligible && (
          <div className="absolute top-4 right-4">
            <Section8Badge eligible={true} compact={true} />
          </div>
        )}

        {/* Status Indicator */}
        {project.status === 'active' && project.progress_percentage !== undefined && project.progress_percentage > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg px-3 py-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Restoration Progress</span>
              <span className="text-brand-teal font-bold">{project.progress_percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
              <div
                className="bg-gradient-to-r from-brand-teal to-brand-olive h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${project.progress_percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Home Details (Bottom Section - Clean & Emotional) */}
      <div className="p-6 flex flex-col flex-grow">

        {/* Home Title & Location */}
        <div className="mb-3">
          <h3 className="font-heading font-bold text-xl text-brand-navy mb-1">
            <Link href={`/projects/${project.slug}`} className="hover:underline hover:text-brand-teal transition-colors">
              {project.title}
            </Link>
          </h3>
          <p className="text-sm text-slate-600 flex items-center gap-1">
            <span>🏡</span>
            {project.city}
          </p>
        </div>

        {/* Emotional Tagline (Replaces Description) */}
        <p className="text-slate-700 text-sm mb-4 italic leading-relaxed">
          "{emotionalTagline}"
        </p>

        {/* Price Context - Now Shows Value Proposition */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          {project.market_value && project.voucher_cost ? (
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Market Value</span>
                <span className="font-bold text-slate-700">{project.market_value}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Your Monthly Cost</span>
                <span className="font-bold text-brand-teal">{project.voucher_cost}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center text-sm mb-4">
              <span className="text-slate-500">Budget Friendly</span>
              <span className="font-bold text-brand-navy">{project.budget_range}</span>
            </div>
          )}

          {/* Call-to-Action */}
          <Link
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-brand-navy to-brand-teal text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-[1.02]"
          >
            <span>View This Home</span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
