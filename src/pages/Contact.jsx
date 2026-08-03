import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Globe,
  Sparkles
} from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'General Support',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-bold text-cyan-400 border-cyan-500/30 glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> 24/7 Cyber Defense Support
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Get in Touch With <span className="gradient-text">Security Experts</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Have a question about a scam report, need emergency escalation, or want to integrate our Enterprise API? Our team is standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (7 cols) */}
        <Card className="lg:col-span-7 glass-panel p-6 sm:p-8 space-y-6 border-slate-800">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" /> Send Security Message
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fill out the form below and a security engineer will respond within 15 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
              <h4 className="text-lg font-bold text-white">Message Received!</h4>
              <p className="text-xs text-slate-300">
                Thank you for reaching out. Ticket <strong className="text-cyan-400 font-mono">#TICKET-8941</strong> has been created and assigned to our Security Operations Center.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Inquiry Type
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl text-xs border-slate-800 focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="General Support">General Support & Feedback</option>
                  <option value="Emergency Scam Escalation">Emergency Scam Escalation</option>
                  <option value="Enterprise API Sales">Enterprise API Sales & Demo</option>
                  <option value="Press & Security Research">Press & Security Research</option>
                </select>
              </div>

              <Input
                label="Subject"
                placeholder="e.g. Urgent Telegram Scam Report Inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Message Payload
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question or provide scam evidence details..."
                  className="w-full glass-input p-4 rounded-xl text-xs border-slate-800 font-mono"
                  required
                />
              </div>

              <Button type="submit" variant="primary" icon={Send} className="w-full">
                Submit Security Ticket
              </Button>
            </form>
          )}
        </Card>

        {/* Right Info Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <Card className="glass-panel p-6 space-y-4 border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" /> Security Operations Center (SOC)
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Email Contact</span>
                  <span className="text-slate-200 font-mono font-bold">security@scamshield.ai</span>
                  <p className="text-[11px] text-slate-500">Response SLA: &lt; 15 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">24/7 Security Hotline</span>
                  <span className="text-slate-200 font-mono font-bold">+1 (800) 555-SCAM</span>
                  <p className="text-[11px] text-slate-500">Emergency fraud escalation line</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">National Cyber Crime Portal</span>
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 font-mono font-bold hover:underline"
                  >
                    cybercrime.gov.in
                  </a>
                  <p className="text-[11px] text-slate-500">Official government reporting portal</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-panel p-6 space-y-3 border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Operational Hours
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our automated Gemini AI threat engine and community database operate <strong className="text-cyan-400">24/7/365</strong>. Human security moderators review emergency tickets continuously.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
