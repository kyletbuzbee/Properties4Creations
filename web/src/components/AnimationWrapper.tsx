'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp' | 'float';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration,
  threshold = 0.1,
  className = '',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Skip animation setup if user prefers reduced motion
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);

            if (once && observer) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, once, prefersReducedMotion]);

  const animationClass = animation === 'fadeInUp' ? 'animate-fade-in-up' :
                         animation === 'fadeInLeft' ? 'animate-fade-in-left' :
                         animation === 'fadeInRight' ? 'animate-fade-in-right' :
                         animation === 'scaleIn' ? 'animate-scale-in' :
                         animation === 'slideInUp' ? 'animate-slide-in-up' :
                         animation === 'float' ? 'animate-float' : 'animate-fade-in-up';

  const customDuration = duration ? `--duration-normal: ${duration}s;` : '';

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms`, ...customDuration && { customDuration } } as any}
    >
      {children}
    </div>
  );
};

export default AnimationWrapper;
