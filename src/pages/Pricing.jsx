import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Check,
  X,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Lock,
  Users,
  Building
} from 'lucide-react';

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const featureComparison = [
    { name: 'Text & URL Scanning', free: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited API' },
    { name: 'Screenshot OCR Scans', free: '10 / month', pro: 'Unlimited', enterprise: 'Unlimited API' },
    { name: 'Gemini 1.5 Flash AI Engine', free: 'Basic Heuristics', pro: 'Full Vision + NLP', enterprise: 'Custom Tuned Prompt' },
    { name: 'Community Database Search', free: true, pro: true, enterprise: true },
    { name: 'Downloadable PDF Audit Reports', free: 'Standard', pro: 'Priority Detailed', enterprise: 'Custom Branded' },
    { name: 'Real-Time Threat SMS/Call Alerts', free: false, pro: true, enterprise: true },
    { name: 'Family Account Sharing', free: false, pro: 'Up to 5 Users', enterprise: 'Unlimited Seats' },
    { name: 'REST API Access', free: false, pro: false, enterprise: '100k Calls/mo' },
    { name: 'SLA Guarantee', free: 'Standard', pro: '99.5% Uptime', enterprise: '99.9% Dedicated' },
    { name: 'Security Support', free: 'Community', pro: 'Priority Email', enterprise: '24/7 Dedicated Engineer' }
  ];

  const pricingFaqs = [
    {
      q: 'Is ScamShield AI really free for individual citizens?',
      a: 'Yes, our Free Citizen Plan is 100% free forever. It includes unlimited text message and URL scanning, access to the community scam database, and 10 screenshot OCR scans every month.'
    },
    {
      q: 'Can I cancel or upgrade my subscription anytime?',
      a: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time from your Profile & Billing Dashboard without any hidden fees.'
    },
    {
      q: 'How does Family Sharing work on the Security Pro plan?',
      a: 'The Security Pro plan allows you to invite up to 4 family members (total 5 accounts). Each family member receives full Pro features including real-time threat alerts.'
    },
    {
      q: 'What is included in the Enterprise Shield API?',
      a: 'Enterprise Shield provides REST API keys with high-throughput rate limits, allowing fintech applications, job portals, and messaging apps to scan user content for scams automatically.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-bold text-cyan-400 border-cyan-500/30 glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> Transparent Cyber Security Plans
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Protect Yourself & Your Enterprise <br className="hidden sm:inline" />
          With <span className="gradient-text">ScamShield AI</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Free forever for individual citizens. Upgrade to Pro or Enterprise for automated API protection and priority threat intelligence.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="inline-flex items-center gap-3 bg-slate-900/90 p-1.5 rounded-full border border-slate-800 pt-2">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
              billingCycle === 'monthly' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all ${
              billingCycle === 'annual' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual Billing (Save 20%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Free Citizen */}
        <Card className="glass-panel p-8 space-y-6 flex flex-col justify-between border-slate-800 hover:border-cyan-500/40">
          <div className="space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Free Citizen Plan</h3>
            <div className="text-4xl font-black text-white font-mono">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
            <p className="text-xs text-slate-400">Essential scam protection for individuals.</p>

            <ul className="space-y-3 text-xs text-slate-300 pt-3 border-t border-slate-800/80 font-medium">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Unlimited Text & URL Scans</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> 10 Screenshot OCR Scans / Mo</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Community Database Access</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Standard PDF Security Reports</li>
              <li className="flex items-center gap-2.5 text-slate-500 opacity-60"><X className="w-4 h-4 shrink-0" /> Real-time SMS & Call Alerts</li>
            </ul>
          </div>
          <Link to="/register"><Button className="w-full" variant="secondary">Get Started Free</Button></Link>
        </Card>

        {/* Card 2: Security Pro */}
        <Card className="glass-panel p-8 space-y-6 flex flex-col justify-between border-cyan-500/50 glow-cyan relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
            MOST POPULAR
          </div>
          <div className="space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Security Pro</h3>
            <div className="text-4xl font-black text-white font-mono">
              {billingCycle === 'monthly' ? '$9.99' : '$7.99'} <span className="text-xs font-normal text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-400">Advanced AI protection for families & professionals.</p>

            <ul className="space-y-3 text-xs text-slate-300 pt-3 border-t border-slate-800/80 font-medium">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Unlimited Screenshot OCR Scans</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Real-time SMS & Call Threat Alerts</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Priority PDF Audit Export</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Family Account Sharing (Up to 5)</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Priority 24/7 Email Support</li>
            </ul>
          </div>
          <Link to="/register"><Button className="w-full" variant="primary">Upgrade to Pro</Button></Link>
        </Card>

        {/* Card 3: Enterprise */}
        <Card className="glass-panel p-8 space-y-6 flex flex-col justify-between border-slate-800 hover:border-cyan-500/40">
          <div className="space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Enterprise Shield</h3>
            <div className="text-4xl font-black text-white font-mono">$49 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <p className="text-xs text-slate-400">API integration for apps & organizations.</p>

            <ul className="space-y-3 text-xs text-slate-300 pt-3 border-t border-slate-800/80 font-medium">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> REST API Access for Fraud Checks</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Custom Gemini AI Prompt Tuning</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> 99.9% Uptime SLA Guarantee</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Dedicated Security Engineer Support</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Custom Branded PDF Reports</li>
            </ul>
          </div>
          <Link to="/contact"><Button className="w-full" variant="secondary">Contact Enterprise Sales</Button></Link>
        </Card>
      </div>

      {/* Feature Comparison Matrix */}
      <Card className="glass-panel p-6 sm:p-8 space-y-6 border-slate-800">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-white">Detailed Feature Matrix</h2>
          <p className="text-xs text-slate-400">Compare features across Free, Pro, and Enterprise tiers.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase font-bold">
                <th className="py-3.5 px-4">Feature</th>
                <th className="py-3.5 px-4 text-center">Free Citizen</th>
                <th className="py-3.5 px-4 text-center text-cyan-400">Security Pro</th>
                <th className="py-3.5 px-4 text-center">Enterprise Shield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {featureComparison.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-4 text-slate-200 font-semibold">{item.name}</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    {typeof item.free === 'boolean' ? (item.free ? <Check className="w-4 h-4 text-cyan-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />) : item.free}
                  </td>
                  <td className="py-3.5 px-4 text-center text-cyan-300 font-bold">
                    {typeof item.pro === 'boolean' ? (item.pro ? <Check className="w-4 h-4 text-cyan-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />) : item.pro}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-300 font-bold">
                    {typeof item.enterprise === 'boolean' ? (item.enterprise ? <Check className="w-4 h-4 text-cyan-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />) : item.enterprise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="info" size="md">PRICING FAQ</Badge>
          <h2 className="text-3xl font-black text-white">Pricing & Subscription Questions</h2>
        </div>

        <div className="space-y-4">
          {pricingFaqs.map((faq, idx) => (
            <Card
              key={idx}
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              className="glass-panel p-6 cursor-pointer space-y-2 transition-all hover:border-cyan-500/40"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{faq.q}</h4>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180 text-cyan-400' : ''}`} />
              </div>
              {expandedFaq === idx && (
                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80 font-medium">
                  {faq.a}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
