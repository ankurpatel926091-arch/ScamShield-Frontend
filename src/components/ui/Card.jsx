import React from 'react';

export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`rounded-2xl glass-card p-6 ${hover ? 'hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
