'use client';

import React from 'react';
import ServiceIcon, { ServiceIconType } from './ServiceIcon';

interface IconBadgeProps {
  icon: ServiceIconType;
  title: string;
  description: string;
  variant?: 'default' | 'outline' | 'filled';
}

/**
 * IconBadge Component
 * 
 * Displays an icon with title and description
 * Perfect for feature highlights and service listings
 * 
 * Variants:
 * - default: Subtle with light background
 * - outline: Border-based style
 * - filled: Solid color background
 * 
 * Usage:
 * <IconBadge 
 *   icon="housing" 
 *   title="Affordable Housing" 
 *   description="Homes accessible to veterans and families"
 *   variant="default"
 * />
 */
export const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  title,
  description,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-slate-50 border border-slate-100 hover:bg-slate-100',
    outline: 'border border-brand-sage hover:border-brand-teal hover:bg-slate-50',
    filled: 'bg-slate-100 border border-slate-200 hover:bg-slate-200',
  };

  return (
    <div className={`p-6 rounded-lg transition-all duration-300 ${variantClasses[variant]}`}>
      <div className="mb-3">
        <ServiceIcon type={icon} size="lg" />
      </div>
      <h3 className="font-semibold text-slate-900 mb-2 text-lg">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default IconBadge;
