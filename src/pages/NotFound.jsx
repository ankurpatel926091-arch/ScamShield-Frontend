import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldAlert, ArrowLeft, Home as HomeIcon, AlertTriangle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full glass-panel p-8 text-center space-y-6 border-slate-800 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto shadow-lg shadow-red-500/10">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black font-mono text-cyan-400">404</span>
          <h1 className="text-2xl font-black text-white">Security Perimeter Boundary</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The security report or resource path you are attempting to access does not exist or has been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" icon={HomeIcon} className="w-full">
              Return Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()} className="w-full sm:w-auto">
            <Button variant="secondary" icon={ArrowLeft} className="w-full">
              Go Back
            </Button>
          </button>
        </div>
      </Card>
    </div>
  );
};
