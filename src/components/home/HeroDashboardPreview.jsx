import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle2, Zap, Terminal, Lock, Activity, Eye, Search, ShieldCheck } from 'lucide-react';

export const HeroDashboardPreview = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 group">
      {/* Background Neon Backdrop Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 pointer-events-none" />

      {/* Main Glass Dashboard Card */}
      <div className="relative rounded-2xl glass-panel border border-slate-700/80 shadow-2xl overflow-hidden bg-slate-950/90 p-4 sm:p-6 space-y-6">
        
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono font-bold text-slate-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> ScamShield AI Intelligence Terminal v2.4
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              LIVE MONITORING
            </span>
          </div>
        </div>

        {/* Inner Grid Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Left Panel: Realtime Threat Stream (4 cols) */}
          <div className="md:col-span-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Threat Feeds</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            <div className="space-y-2">
              {[
                { title: 'Telegram Part-time Job', risk: '98%', status: 'CRITICAL', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
                { title: 'Electricity Disconnection SMS', risk: '95%', status: 'HIGH', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
                { title: 'Phishing URL (.xyz Domain)', risk: '92%', status: 'HIGH', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
                { title: 'Bank Impersonation Call', risk: '88%', status: 'MODERATE', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' }
              ].map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-200 block truncate max-w-[130px]">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Risk: {item.risk}</span>
                  </div>
                  <span className={`text-[9px] font-black font-mono px-2 py-0.5 rounded border ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Main Panel: Security Intelligence Inspection (8 cols) */}
          <div className="md:col-span-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-white font-mono">TARGET_ANALYSIS #SCAM-89412</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">GEMINI 1.5 FLASH ACTIVE</span>
            </div>

            {/* Target Sample Code Box */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <span className="text-slate-500">// EXTRACTED OCR PAYLOAD:</span>
              <p className="text-slate-200">
                "Earn <span className="text-red-400 font-bold underline bg-red-500/20 px-1 rounded">₹3000 daily</span> by rating maps. Pay <span className="text-red-400 font-bold underline bg-red-500/20 px-1 rounded">₹1000 registration deposit</span> to unlock level 1 tasks on <span className="text-cyan-400 font-bold">Telegram @job_hr</span>."
              </p>
            </div>

            {/* Risk Indicators & Meter */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Risk Score</span>
                <span className="text-xl font-black text-red-400 font-mono">98/100</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Confidence</span>
                <span className="text-xl font-black text-cyan-400 font-mono">96%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Verdict</span>
                <span className="text-xs font-black text-red-400 uppercase tracking-wider block mt-1">FAKE JOB</span>
              </div>
            </div>
          </div>

        </div>

        {/* FLOATING OVERLAY CARDS FOR 3D EFFECT */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:flex items-center gap-3 absolute -top-4 -left-6 px-4 py-2.5 rounded-2xl glass-card border border-cyan-500/40 shadow-2xl bg-slate-950/90 text-xs font-bold text-white"
        >
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-mono">OCR Detection Speed</span>
            <span className="font-mono text-cyan-400">1.2 Seconds Scan</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden lg:flex items-center gap-3 absolute -bottom-4 -right-6 px-4 py-2.5 rounded-2xl glass-card border border-red-500/40 shadow-2xl bg-slate-950/90 text-xs font-bold text-white"
        >
          <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-mono">Fraud Prevention Alert</span>
            <span className="font-mono text-red-400">Upfront Deposit Flagged</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
