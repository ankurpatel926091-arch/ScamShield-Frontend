import React from 'react';
import { Button } from './Button';
import { SearchX, ShieldAlert, FileX, Inbox, BookmarkX } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'No Results Found',
  description = 'We couldn\'t find any matching records for your search query.',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-10 rounded-2xl glass-panel text-center space-y-4 max-w-md mx-auto border-slate-800 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
        <Icon className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">{description}</p>
      </div>
      {actionText && onAction && (
        <Button size="sm" variant="primary" onClick={onAction} className="mt-2">
          {actionText}
        </Button>
      )}
    </div>
  );
};
