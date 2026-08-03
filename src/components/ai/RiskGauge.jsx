import React from 'react';
import { ShieldAlert, ShieldCheck, AlertOctagon, Flame } from 'lucide-react';

export const RiskGauge = ({ score = 50, confidence = 88 }) => {
  const getScoreTheme = (val) => {
    if (val < 30) {
      return {
        text: 'text-emerald-400',
        gradientStart: '#10b981',
        gradientEnd: '#059669',
        label: 'SAFE / LOW RISK',
        level: 'LOW',
        bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        glow: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
        icon: ShieldCheck
      };
    }
    if (val < 60) {
      return {
        text: 'text-amber-400',
        gradientStart: '#f59e0b',
        gradientEnd: '#d97706',
        label: 'MODERATE THREAT RISK',
        level: 'MEDIUM',
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        glow: 'shadow-[0_0_30px_rgba(245,158,11,0.25)]',
        icon: AlertOctagon
      };
    }
    if (val < 80) {
      return {
        text: 'text-orange-400',
        gradientStart: '#f97316',
        gradientEnd: '#ea580c',
        label: 'HIGH THREAT DETECTED',
        level: 'HIGH',
        bg: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
        glow: 'shadow-[0_0_35px_rgba(249,115,22,0.35)]',
        icon: ShieldAlert
      };
    }
    return {
      text: 'text-red-400',
      gradientStart: '#ef4444',
      gradientEnd: '#dc2626',
      label: 'CRITICAL FRAUD THREAT',
      level: 'CRITICAL',
      bg: 'bg-red-500/15 border-red-500/40 text-red-400 animate-pulse',
      glow: 'shadow-[0_0_45px_rgba(239,68,68,0.5)] ring-2 ring-red-500/30',
      icon: Flame
    };
  };

  const theme = getScoreTheme(score);
  const Icon = theme.icon;

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl glass-card border border-slate-700/60 ${theme.glow} transition-all duration-500`}>
      {/* Background Cyber Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none rounded-2xl" />

      {/* Header Label */}
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${theme.text} ${score > 80 ? 'animate-bounce' : ''}`} />
        <span className="text-xs font-black tracking-wider uppercase text-slate-300">AI Risk Assessment</span>
      </div>

      {/* SVG Circular Gauge */}
      <div className="relative w-48 h-48 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.gradientStart} />
              <stop offset="100%" stopColor={theme.gradientEnd} />
            </linearGradient>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="12"
            fill="transparent"
          />

          {/* Inner Accent Ring */}
          <circle
            cx="96"
            cy="96"
            r={radius - 12}
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="transparent"
          />

          {/* Animated Value Arc */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            filter="url(#glowEffect)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Contents */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-black font-mono tracking-tight ${theme.text}`}>
            {score}
            <span className="text-sm text-slate-400 font-normal">%</span>
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">
            Risk Score
          </span>
        </div>
      </div>

      {/* Threat Level Badge */}
      <div className={`mt-3 px-4 py-1.5 rounded-full border text-xs font-black tracking-widest uppercase flex items-center gap-2 ${theme.bg}`}>
        <span className={`w-2 h-2 rounded-full ${score > 80 ? 'bg-red-400 animate-ping' : score > 60 ? 'bg-orange-400' : score > 30 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
        {theme.label}
      </div>

      {/* Sub-Metrics Meter */}
      <div className="w-full grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-slate-800/80 text-center">
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Confidence</span>
          <span className="text-sm font-black text-cyan-400 font-mono">{confidence}%</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Threat Level</span>
          <span className={`text-sm font-black font-mono ${theme.text}`}>{theme.level}</span>
        </div>
      </div>
    </div>
  );
};
