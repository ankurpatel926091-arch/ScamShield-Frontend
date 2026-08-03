import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Lock,
  Users,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
  Heart,
  CheckCircle2,
  Terminal,
  Database
} from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Hero Mission Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-bold text-cyan-400 border-cyan-500/30 glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> Our Mission & Vision
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Empowering Citizens to <br className="hidden sm:inline" />
          <span className="gradient-text">Eliminate Digital Fraud</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
          ScamShield AI was built with a single mission: to harness multi-modal AI, computer vision OCR, and community intelligence to protect everyday citizens and organizations from financial scams, phishing lures, and digital impersonation.
        </p>
      </div>

      {/* Impact Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-slate-800/80 py-10 bg-slate-950/60 backdrop-blur-md">
        <div className="space-y-1">
          <h3 className="text-3xl sm:text-5xl font-black text-white font-mono gradient-text">2 Million+</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Scans Executed</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl sm:text-5xl font-black text-white font-mono gradient-text">$12.5M+</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fraud Losses Prevented</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl sm:text-5xl font-black text-white font-mono gradient-text">120K+</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Protected Users</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl sm:text-5xl font-black text-white font-mono gradient-text">80K+</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Scams Cataloged</p>
        </div>
      </div>

      {/* Core Value Pillars */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="info" size="md">CORE PILLARS</Badge>
          <h2 className="text-3xl font-black text-white">Why ScamShield AI Exists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-panel p-8 space-y-4 border-slate-800">
            <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Privacy-First Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We process screenshots transiently in memory for OCR text extraction. User photos are never sold, rented, or stored permanently.
            </p>
          </Card>

          <Card className="glass-panel p-8 space-y-4 border-slate-800">
            <div className="p-3 w-fit rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Community Intelligence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every reported UPI ID, fake recruiter handle, or phishing URL protects thousands of other users instantly through peer indexing.
            </p>
          </Card>

          <Card className="glass-panel p-8 space-y-4 border-slate-800">
            <div className="p-3 w-fit rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Multi-Modal AI Reasoning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tesseract OCR + Google Gemini 1.5 Flash evaluates complex scam context, deposit requests, urgency lures, and fake company credentials.
            </p>
          </Card>
        </div>
      </div>

      {/* Leadership & Engineering Team */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="info" size="md">OUR TEAM</Badge>
          <h2 className="text-3xl font-black text-white">Built by Cyber Security Specialists</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Aarav Mehta', role: 'Founder & Lead AI Architect', desc: 'Former AI Security Researcher specialized in NLP threat heuristics & computer vision.' },
            { name: 'Rohan Gupta', role: 'Head of Cyber Intelligence', desc: 'Ex-Fintech Fraud Investigator with 10+ years experience indexing phishing networks.' },
            { name: 'Dr. Sneha Verma', role: 'Chief Security Officer', desc: 'PhD in Cryptography & Cybersecurity, leading threat database verification.' }
          ].map((member, idx) => (
            <Card key={idx} className="glass-panel p-6 space-y-4 border-slate-800 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 mx-auto flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-cyan-500/20 border border-cyan-400/40">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <span className="text-xs font-semibold text-cyan-400">{member.role}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{member.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="glass-panel p-10 text-center space-y-6 border-cyan-500/40 glow-cyan">
        <h2 className="text-3xl font-black text-white">Join the ScamShield AI Network</h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Start inspecting suspicious chat screenshots or report a new scam to safeguard your community.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/scan"><Button variant="primary" icon={ShieldAlert}>Start Free AI Scan</Button></Link>
          <Link to="/contact"><Button variant="secondary">Get In Touch</Button></Link>
        </div>
      </Card>
    </div>
  );
};
