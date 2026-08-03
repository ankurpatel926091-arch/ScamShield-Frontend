import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                ScamShield <span className="gradient-text font-black">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Enterprise-grade AI scam detection platform empowering citizens and organizations to analyze suspicious screenshots, texts, URLs, and phone numbers before fraud happens.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-2">
              <a href="#" className="hover:text-cyan-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Core Product */}
          <div>
            <h4 className="font-semibold text-slate-100 uppercase tracking-wider text-xs mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link to="/scan" className="hover:text-cyan-400 transition-colors">AI Screenshot Scanner</Link></li>
              <li><Link to="/scan?tab=text" className="hover:text-cyan-400 transition-colors">Text Fraud Analyzer</Link></li>
              <li><Link to="/scan?tab=url" className="hover:text-cyan-400 transition-colors">Phishing URL Checker</Link></li>
              <li><Link to="/database" className="hover:text-cyan-400 transition-colors">Scam Database Search</Link></li>
              <li><Link to="/community" className="hover:text-cyan-400 transition-colors">Community Reports</Link></li>
            </ul>
          </div>

          {/* Solutions & Security */}
          <div>
            <h4 className="font-semibold text-slate-100 uppercase tracking-wider text-xs mb-4">Categories</h4>
            <ul className="space-y-2.5">
              <li><span className="hover:text-cyan-400 cursor-pointer">UPI / QR Code Fraud</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">Fake Job & Internship</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">Telegram & WhatsApp Traps</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">Crypto Investment Scams</span></li>
              <li><span className="hover:text-cyan-400 cursor-pointer">Bank Impersonation</span></li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="font-semibold text-slate-100 uppercase tracking-wider text-xs mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-cyan-400 transition-colors">Pricing Plans</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/analytics" className="hover:text-cyan-400 transition-colors">Threat Database</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ScamShield AI Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for global cyber defense.
          </p>
        </div>
      </div>
    </footer>
  );
};
