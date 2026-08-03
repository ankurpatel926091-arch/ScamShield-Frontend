import React from 'react';

export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-800/70 border border-slate-700/30 ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-6 rounded-2xl glass-panel space-y-4 ${className}`}>
    <Skeleton className="h-5 w-1/3" />
    <Skeleton className="h-8 w-2/3" />
    <Skeleton className="h-4 w-full" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    {[...Array(rows)].map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);

export const SkeletonDashboard = () => (
  <div className="space-y-6">
    <Skeleton className="h-36 w-full" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
    <Skeleton className="h-64 w-full" />
  </div>
);
