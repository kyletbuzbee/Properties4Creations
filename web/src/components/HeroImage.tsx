'use client';

import React from 'react';
import Image from 'next/image';

interface HeroImageProps {
  src: string;
  alt: string;
  overlayOpacity?: 'none' | 'light' | 'medium' | 'heavy';
  overlayColor?: 'black' | 'blue' | 'none';
  children?: React.ReactNode;
  priority?: boolean;
  height?: number;
  className?: string;
}

const overlayClasses = {
  none: '',
  light: 'bg-black/20',
  medium: 'bg-black/40',
  heavy: 'bg-black/60',
};

const overlayColorClasses = {
  black: 'bg-black',
  blue: 'bg-blue-900/40',
  none: '',
};

/**
 * HeroImage Component
 * 
 * Reusable hero image with intelligent overlay handling for text legibility
 * Automatically optimized for Next.js with lazy loading and responsive sizing
 * 
 * Features:
 * - Responsive image sizing
 * - Configurable overlay opacity and color
 * - Priority loading for above-fold images
 * - Optional overlay gradient for text readability
 * - Support for nested content
 * 
 * Usage:
 * import { HeroImage } from '@/components/HeroImage';
 * 
 * const MyHero = () => (
 *   <HeroImage
 *     src="/images/hero/seller-hero-1920x1080.jpg"
 *     alt="Properties 4 Creation - Affordable Housing"
 *     overlayOpacity="medium"
 *     priority
 *   />
 * );
 */
export const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  overlayOpacity = 'medium',
  overlayColor = 'black',
  children,
  priority = false,
  height = 600,
  className = '',
}) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`} style={{ height: `${height}px` }}>
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        quality={75}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1920px"
      />

      {/* Overlay for text legibility */}
      {overlayOpacity !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]}`} />
      )}

      {/* Children/Content Layer */}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
};

/**
 * HeroImageGradient Component
 * 
 * Variant with gradient overlay for enhanced visual interest
 * Overlay fades from dark at top to transparent at bottom
 */
interface HeroImageGradientProps extends Omit<HeroImageProps, 'overlayOpacity' | 'overlayColor'> {
  gradientDirection?: 'top' | 'bottom' | 'both';
}

export const HeroImageGradient: React.FC<HeroImageGradientProps> = ({
  src,
  alt,
  children,
  priority = false,
  height = 600,
  className = '',
  gradientDirection = 'top',
}) => {
  const gradientClasses = {
    top: 'bg-gradient-to-b from-black/50 to-transparent',
    bottom: 'bg-gradient-to-t from-black/50 to-transparent',
    both: 'bg-gradient-to-b from-black/40 via-black/10 to-black/40',
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`} style={{ height: `${height}px` }}>
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        quality={75}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1920px"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${gradientClasses[gradientDirection]}`} />

      {/* Children/Content Layer */}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
};

/**
 * HeroImageSplit Component
 * 
 * Split-screen hero image (as used in ModernHero)
 * Perfect for dual-narrative layouts (sellers vs renters, before vs after)
 */
interface HeroImageSplitProps {
  leftImage: string;
  rightImage: string;
  leftAlt: string;
  rightAlt: string;
  priority?: boolean;
  height?: number;
  overlayOpacity?: 'none' | 'light' | 'medium' | 'heavy';
}

export const HeroImageSplit: React.FC<HeroImageSplitProps> = ({
  leftImage,
  rightImage,
  leftAlt,
  rightAlt,
  priority = false,
  height = 600,
  overlayOpacity = 'light',
}) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ height: `${height}px` }}>
      {/* Left Side */}
      <div className="absolute left-0 top-0 w-1/2 h-full">
        <Image
          src={leftImage}
          alt={leftAlt}
          fill
          className="object-cover"
          priority={priority}
          quality={75}
          sizes="50vw"
        />
        {overlayOpacity !== 'none' && (
          <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]}`} />
        )}
      </div>

      {/* Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <Image
          src={rightImage}
          alt={rightAlt}
          fill
          className="object-cover"
          priority={priority}
          quality={75}
          sizes="50vw"
        />
        {overlayOpacity !== 'none' && (
          <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]}`} />
        )}
      </div>
    </div>
  );
};

export default HeroImage;
