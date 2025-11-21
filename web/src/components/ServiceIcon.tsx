'use client';

import React from 'react';
import {
  HomeIcon,
  CheckCircleIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  HandRaisedIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentCheckIcon,
  HandThumbUpIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';

export type ServiceIconType =
  | 'housing'
  | 'quality'
  | 'community'
  | 'affordable'
  | 'innovation'
  | 'support'
  | 'location'
  | 'phone'
  | 'email'
  | 'documentation'
  | 'partnership'
  | 'efficiency';

interface ServiceIconProps {
  type: ServiceIconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const iconMap: Record<ServiceIconType, React.ReactNode> = {
  housing: <HomeIcon className={`${sizeMap.lg} text-brand-sage`} />,
  quality: <CheckCircleIcon className={`${sizeMap.lg} text-brand-teal`} />,
  community: <UserGroupIcon className={`${sizeMap.lg} text-brand-navy`} />,
  affordable: <CurrencyDollarIcon className={`${sizeMap.lg} text-brand-red`} />,
  innovation: <SparklesIcon className={`${sizeMap.lg} text-brand-olive`} />,
  support: <HandRaisedIcon className={`${sizeMap.lg} text-brand-sage`} />,
  location: <MapPinIcon className={`${sizeMap.lg} text-brand-red`} />,
  phone: <PhoneIcon className={`${sizeMap.lg} text-brand-teal`} />,
  email: <EnvelopeIcon className={`${sizeMap.lg} text-brand-navy`} />,
  documentation: <DocumentCheckIcon className={`${sizeMap.lg} text-brand-olive`} />,
  partnership: <HandThumbUpIcon className={`${sizeMap.lg} text-brand-sage`} />,
  efficiency: <LightBulbIcon className={`${sizeMap.lg} text-brand-teal`} />,
};

/**
 * ServiceIcon Component
 * 
 * Pre-configured icon component using Heroicons
 * Maintains consistent sizing and color scheme across the application
 * 
 * Usage:
 * <ServiceIcon type="housing" size="lg" />
 * <ServiceIcon type="quality" size="md" className="custom-class" />
 */
export const ServiceIcon: React.FC<ServiceIconProps> = ({ 
  type, 
  size = 'lg',
  className = '' 
}) => {
  const baseIcon = iconMap[type];
  
  if (!baseIcon) {
    return <HomeIcon className={`${sizeMap[size]} text-gray-400`} />;
  }

  // Clone the icon element to apply size and custom className
  return React.cloneElement(baseIcon as React.ReactElement, {
    className: `${sizeMap[size]} ${className}`,
  });
};

export default ServiceIcon;
