import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'md', className = '' }) => {
  const variants = {
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 glow-danger',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    info: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/30 glow-cyan',
    neutral: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-bold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-md ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};
