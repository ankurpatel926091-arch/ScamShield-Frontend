import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle2, Zap, Terminal, Lock, Activity, Eye, Search, ShieldCheck } from 'lucide-react';

export const HeroDashboardPreview = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 group">
      {/* Background Neon Backdrop Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 pointer-events-none" />

      {/* Main Glass Dashboard Card */}
      <div className="relative rounded-2xl glass-panel border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden bg-white/90 dark:bg-slate-950/90 p-4 sm:p-6 space-y-6 transition-colors">
        
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> ScamShield AI Intelligence Terminal v2.4
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              LIVE MONITORING
            </span>
          </div>
        </div>

        {/* Inner Grid Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Left Panel: Realtime Threat Stream (4 cols) */}
          <div className="md:col-span-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Active Threat Feeds</span>
              <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            </div>

            <div className="space-y-2">
              {[
                { title: 'Telegram Part-time Job', risk: '98%', status: 'CRITICAL', color: 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/30' },
                { title: 'Electricity Disconnection SMS', risk: '95%', status: 'HIGH', color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/30' },
                { title: 'Phishing URL (.xyz Domain)', risk: '92%', status: 'HIGH', color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/30' },
                { title: 'Bank Impersonation Call', risk: '88%', status: 'MODERATE', color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30' }
              ].map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs shadow-xs">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-[130px]">{item.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Risk: {item.risk}</span>
                  </div>
                  <span className={`text-[9px] font-black font-mono px-2 py-0.5 rounded border ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Main Panel: Security Intelligence Inspection (8 cols) */}
          <div className="md:col-span-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500 dark:text-red-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">TARGET_ANALYSIS #SCAM-89412</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">GEMINI 1.5 FLASH ACTIVE</span>
            </div>

            {/* Target Sample Code Box */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-300 space-y-1">
              <span className="text-slate-500 dark:text-slate-500">// EXTRACTED OCR PAYLOAD:</span>
              <p className="text-slate-800 dark:text-slate-200">
                "Earn <span className="text-red-600 dark:text-red-400 font-bold underline bg-red-500/20 px-1 rounded">₹3000 daily</span> by rating maps. Pay <span className="text-red-600 dark:text-red-400 font-bold underline bg-red-500/20 px-1 rounded">₹1000 registration deposit</span> to unlock level 1 tasks on <span className="text-cyan-600 dark:text-cyan-400 font-bold">Telegram @job_hr</span>."
              </p>
            </div>

            {/* Risk Gauge Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-semibold">AI Calculated Fraud Risk Score</span>
                <span className="text-red-600 dark:text-red-400 font-mono font-black text-sm">98 / 100 (CRITICAL THREAT)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 h-full rounded-full w-[98%] animate-pulse" />
              </div>
            </div>

            {/* AI Reasoning Flags */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Upfront Payment Request</span>
              </div>
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Telegram Task Scam Pattern</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
