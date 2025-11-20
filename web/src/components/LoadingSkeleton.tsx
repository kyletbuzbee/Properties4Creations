import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  lines = 3,
  showAvatar = false,
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-32"></div>
            <div className="h-3 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className="h-4 bg-slate-200 rounded"
            style={{ width: `${Math.random() * 40 + 60}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

interface ProjectCardSkeletonProps {
  className?: string;
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-card overflow-hidden animate-pulse ${className}`}>
      {/* Image skeleton */}
      <div className="h-48 bg-slate-200"></div>

      {/* Content skeleton */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="h-6 bg-slate-200 rounded w-20"></div>
            <div className="h-8 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FormSkeletonProps {
  className?: string;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-6 animate-pulse ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-4/5"></div>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>
            <div className="h-5 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div>
        <div className="h-5 bg-slate-200 rounded w-24 mb-2"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
      </div>

      {/* Button */}
      <div className="h-12 bg-slate-200 rounded-lg mx-auto w-40"></div>
    </div>
  );
};
