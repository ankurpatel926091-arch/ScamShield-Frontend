import React, { forwardRef } from 'react';

export const Input = forwardRef(
  ({ label, error, icon: Icon, className = '', containerClassName = '', ...props }, ref) => {
    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-400">
            {label}
          </label>
        )}
        <div className="relative rounded-xl overflow-hidden">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full py-2.5 ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 text-sm glass-input rounded-xl transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/50 ${
              error ? 'border-red-500/80 focus:ring-red-500/50' : 'border-slate-300 dark:border-slate-800'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 dark:text-red-400 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
