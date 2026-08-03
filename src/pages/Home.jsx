import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { RiskGauge } from '../components/ai/RiskGauge';
import { HeroDashboardPreview } from '../components/home/HeroDashboardPreview';
import {
  ShieldAlert,
  Scan,
  Database,
  Users,
  Lock,
  Zap,
  Globe,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Mail,
  Check,
  Star,
  Play,
  FileText,
  Phone,
  Search,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Eye,
  Award,
  Layers,
  Flame,
  ExternalLink,
  Shield
} from 'lucide-react';

export const Home = () => {
  // Interactive Live Demo State
  const [demoText, setDemoText] = useState('');
  const [demoResult, setDemoResult] = useState(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);

  // Pricing Toggle State
  const [billingCycle, setBillingCycle] = useState('monthly');

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Pre-set sample scams for interactive demo
  const sampleScams = [
    {
      title: 'Telegram Rating Scam',
      text: 'Dear Sir/Madam, earn ₹3,000 daily by liking YouTube videos and rating Google maps. Contact Telegram HR @job_recruiter. Deposit ₹1,000 security fee to unlock level 1 tasks.',
      score: 98,
      category: 'Fake Job',
      flags: ['Upfront deposit request required', 'Telegram handle only contact', 'Unrealistically high pay rate', 'Impersonation of HR persona']
    },
    {
      title: 'Electricity Disconnection SMS',
      text: 'Dear Consumer, your electricity power connection will be disconnected tonight at 9:30 PM due to unpaid bill. Contact Officer Sharma immediately on 9876543210 or update via update.apk package.',
      score: 95,
      category: 'Phishing / SMS Trap',
      flags: ['Urgent disconnection threat', 'Urges installing third-party .APK package', 'Unofficial phone number provided']
    },
    {
      title: 'UPI Cash Refund Fraud',
      text: 'Congratulations! You have received ₹5,000 cashback from PhonePe. Click here to claim reward: http://paytm-reward-claim.xyz and enter your UPI PIN to accept.',
      score: 92,
      category: 'UPI / QR Code',
      flags: ['Requests UPI PIN to receive money', 'High-risk .xyz suspicious domain', 'Fake cashback reward trap']
    }
  ];

  const handleRunDemo = (sample) => {
    setDemoText(sample.text);
    setDemoLoading(true);
    setDemoResult(null);
    setDemoProgress(10);

    const interval = setInterval(() => {
      setDemoProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      setDemoResult(sample);
      setDemoLoading(false);
    }, 1000);
  };

  const handleCustomScanDemo = () => {
    if (!demoText.trim()) return;
    setDemoLoading(true);
    setDemoResult(null);
    setDemoProgress(20);

    const interval = setInterval(() => {
      setDemoProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 200);

    setTimeout(() => {
      setDemoResult({
        title: 'Custom Analyzed Message',
        text: demoText,
        score: Math.floor(75 + Math.random() * 20),
        category: 'Suspect Fraud',
        flags: ['Contains high-risk scam triggers', 'Unverified caller or domain link', 'Artificial urgency detected']
      });
      setDemoLoading(false);
    }, 1000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const faqs = [
    {
      q: 'How does ScamShield AI analyze screenshots and text payloads?',
      a: 'ScamShield AI combines Tesseract OCR engine with Google Gemini 1.5 Flash vision & NLP models. It extracts text from chat screenshots, checks domain reputation, evaluates urgency lures, and cross-references known scammer handles against our database.'
    },
    {
      q: 'Is my uploaded screenshot or personal information kept confidential?',
      a: 'Yes, absolutely. We prioritize user privacy. Screenshots are processed transiently in memory for OCR extraction and evaluated against anonymized threat patterns without storing your private photos or personal details.'
    },
    {
      q: 'Can I report a new scam phone number or malicious UPI ID?',
      a: 'Yes! Anyone can submit a scam incident report with evidence. Once validated by community moderators, the scammer phone number, UPI ID, or URL is indexed into the public Scam Database to protect other citizens.'
    },
    {
      q: 'Is ScamShield AI free for everyday citizens?',
      a: 'Yes, ScamShield AI offers a permanent Free Citizen Plan that includes unlimited text/URL scanning and full access to our community threat database.'
    },
    {
      q: 'Can enterprises integrate ScamShield AI API into their apps?',
      a: 'Yes, our Enterprise Shield plan provides REST API endpoints for fintech platforms, job portals, and messaging apps to scan user-submitted text and images for fraud in real-time.'
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      
      {/* ==================== SECTION 1: HERO SECTION ==================== */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background Ambient Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none -z-10" />

        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs font-bold text-cyan-700 dark:text-cyan-400 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            <span>Next-Gen Multi-Modal AI Threat Intelligence Platform</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]"
          >
            Detect Online Scams <br className="hidden sm:inline" />
            Before They <span className="gradient-text">Detect You.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Use AI to analyze suspicious messages, websites, screenshots, emails and phone numbers within seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link to="/scan">
              <Button size="lg" icon={Scan} variant="primary" className="glow-cyan text-base px-8 py-3.5 shadow-xl">
                Start Free Scan
              </Button>
            </Link>
            <a href="#demo">
              <Button size="lg" icon={Play} variant="secondary" className="text-base px-6 py-3.5">
                Watch Demo Sandbox
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Hero Interactive Dashboard Graphic Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <HeroDashboardPreview />
        </motion.div>
      </section>


      {/* ==================== SECTION 2: LIVE STATS COUNTER ==================== */}
      <section className="border-y border-slate-200 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-md py-12 relative transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono gradient-text">2 Million+</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">Scans Performed</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono gradient-text">120K+</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">Active Users Protected</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono gradient-text">95%</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">AI Detection Accuracy</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono gradient-text">80K+</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">Scams Reported & Cataloged</p>
          </div>
        </div>
      </section>


      {/* ==================== SECTION 3: TRUST LOGOS BAR ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          Powered by Industry-Leading AI Models & Cyber Security Standards
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 dark:opacity-70 hover:opacity-100 transition-all duration-500">
          <span className="text-slate-800 dark:text-slate-300 font-black text-lg tracking-wider flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Google Cloud AI
          </span>
          <span className="text-slate-800 dark:text-slate-300 font-black text-lg tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Microsoft Security
          </span>
          <span className="text-slate-800 dark:text-slate-300 font-black text-lg tracking-wider flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Cloudflare Radar
          </span>
          <span className="text-slate-800 dark:text-slate-300 font-black text-lg tracking-wider flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Stripe Security
          </span>
          <span className="text-slate-800 dark:text-slate-300 font-black text-lg tracking-wider flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-600 dark:text-amber-400" /> GitHub Open-Source
          </span>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          *Reference to open-source security intelligence tools & API infrastructure models.
        </p>
      </section>


      {/* ==================== SECTION 4: FEATURES SHOWCASE ==================== */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="info" size="md">ENTERPRISE THREAT SUITE</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Comprehensive Cyber Fraud Defense Features
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineered to detect WhatsApp job traps, phishing links, fake HR offers, UPI fraud, and unverified caller handles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Scan,
              color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
              title: 'AI Screenshot Scanner',
              desc: 'Upload chat screenshots from WhatsApp, Telegram, or SMS. OCR engine extracts text and Gemini AI analyzes risk instantly.'
            },
            {
              icon: Globe,
              color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
              title: 'URL Phishing Inspector',
              desc: 'Check unverified web links for missing HTTPS certificates, suspicious .xyz TLDs, raw IP redirects, and fake login forms.'
            },
            {
              icon: Mail,
              color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
              title: 'Email Scam Analyzer',
              desc: 'Inspect suspicious recruiter emails, inspect SPF/DKIM headers, and flag fake job offers and lottery phishing traps.'
            },
            {
              icon: Phone,
              color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
              title: 'Phone & Caller Lookup',
              desc: 'Search unknown caller phone numbers or email addresses against verified community scam reports before responding.'
            },
            {
              icon: FileText,
              color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
              title: 'Tesseract OCR Detection',
              desc: 'Optical Character Recognition extracts text from low-res chat images and noisy screenshots with high accuracy.'
            },
            {
              icon: Zap,
              color: 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20',
              title: '0-100 Risk Score Engine',
              desc: 'Generates a transparent 0 to 100 Risk Score with weighted point breakdown explaining why an item is dangerous.'
            },
            {
              icon: Users,
              color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
              title: 'Community Fraud Network',
              desc: 'Empowers citizens to report new scam incidents, upload evidence, and alert thousands of active users worldwide.'
            },
            {
              icon: Database,
              color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
              title: 'Threat Intelligence Database',
              desc: 'Real-time database indexing fraudulent UPI handles, bank account numbers, malicious URLs, and Telegram channels.'
            }
          ].map((feature, idx) => (
            <Card key={idx} className="glass-panel p-6 space-y-4 hover:border-cyan-500/50 transition-all group">
              <div className={`p-3 w-fit rounded-2xl border ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>


      {/* ==================== SECTION 5: HOW IT WORKS STEP-BY-STEP ==================== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="success" size="md">SIMPLE 4-STEP WORKFLOW</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How ScamShield AI Protects You
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            From raw screenshot to full cybersecurity report in four automated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { step: '01', title: 'Upload Screenshot', desc: 'Drag & drop chat images, paste suspicious text, or enter URL link.' },
            { step: '02', title: 'OCR Extraction', desc: 'Tesseract OCR engine parses pixels into clean digital readable text.' },
            { step: '03', title: 'Gemini AI Analysis', desc: 'AI models evaluate threat indicators, urgency lures, and deposit requests.' },
            { step: '04', title: 'Security Report', desc: 'Get instant 0-100 risk score, red flags list, and downloadable PDF report.' }
          ].map((item, idx) => (
            <Card key={idx} className="glass-panel p-6 space-y-3 relative overflow-hidden border-slate-200 dark:border-slate-800 hover:border-cyan-500/40">
              <span className="text-5xl font-black text-slate-200 dark:text-slate-800/80 absolute right-4 top-2 font-mono select-none">
                {item.step}
              </span>
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono font-bold flex items-center justify-center text-xs mb-2">
                {item.step}
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white relative z-10">{item.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>


      {/* ==================== SECTION 6: INTERACTIVE LIVE AI DEMO SANDBOX ==================== */}
      <section id="demo" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-spin" /> INTERACTIVE LIVE DEMO SANDBOX
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Test the AI Engine Right Now
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Click any sample scam below or paste your own message to see Gemini AI threat analysis in action.
          </p>
        </div>

        <Card className="glass-panel p-6 sm:p-8 space-y-6 border-slate-200 dark:border-slate-700/80 shadow-2xl relative">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-300 ml-2">Live AI Inspection Terminal</span>
            </div>
            <Badge variant="info" size="sm">Gemini 1.5 Flash Ready</Badge>
          </div>

          {/* Sample Preset Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
              Click a Pre-Set Sample Scam to Test:
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleScams.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunDemo(sample)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3 h-3 text-cyan-600 dark:text-cyan-400 fill-cyan-500" /> {sample.title}
                </button>
              ))}
            </div>
          </div>

          {/* Input text box */}
          <div className="space-y-3">
            <textarea
              rows={3}
              value={demoText}
              onChange={(e) => setDemoText(e.target.value)}
              placeholder="Or paste any suspicious SMS, WhatsApp message, Telegram job offer, or email content here..."
              className="w-full glass-input p-4 rounded-xl text-xs border-slate-300 dark:border-slate-800 font-mono"
            />
            <Button
              onClick={handleCustomScanDemo}
              disabled={!demoText.trim() || demoLoading}
              variant="primary"
              className="w-full"
              icon={Scan}
            >
              Analyze Message Threat
            </Button>
          </div>

          {/* Scanning Progress Bar */}
          {demoLoading && (
            <div className="p-6 text-center space-y-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <Sparkles className="w-8 h-8 text-cyan-500 animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-xs text-cyan-700 dark:text-cyan-300 font-mono font-bold">Scanning threat vectors & heuristics...</p>
                <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-2 overflow-hidden max-w-xs mx-auto border border-slate-300 dark:border-slate-800">
                  <div className="bg-cyan-500 h-2 transition-all duration-300" style={{ width: `${demoProgress}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Live Result View */}
          {demoResult && !demoLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-5 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-4 md:pb-0">
                <RiskGauge score={demoResult.score} confidence={96} />
              </div>
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="danger" size="md">Category: {demoResult.category}</Badge>
                  <span className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">Critical Threat Flagged</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Detected Fraud Indicators:</h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {demoResult.flags.map((flag, i) => (
                    <li key={i} className="flex items-center gap-2 text-red-700 dark:text-red-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </Card>
      </section>


      {/* ==================== SECTION 7: WHY CHOOSE US ADVANTAGES ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="info" size="md">THE SCAMSHIELD ADVANTAGE</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Why ScamShield AI Leads Cyber Defense
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: '99% Detection Accuracy', desc: 'Trained on over 100,000 global scam patterns and local fraud indicators.', icon: Award },
            { title: 'Gemini AI Powered', desc: 'Leverages Google Gemini vision & LLM models for deep semantic context analysis.', icon: Cpu },
            { title: 'Sub-2 Second Speed', desc: 'Ultra-fast OCR and real-time heuristics return threat scores in under 2 seconds.', icon: Zap },
            { title: 'Community Verified Database', desc: 'Peer-reviewed scammer handles, phone numbers, and UPI IDs updated daily.', icon: Users },
            { title: 'Privacy-First Architecture', desc: 'Zero data retention policy ensures your uploaded screenshots are never exposed.', icon: Lock },
            { title: 'Real-Time Threat Alerts', desc: 'Instant risk score notifications, red flags list, and downloadable PDF reports.', icon: ShieldCheck }
          ].map((item, idx) => (
            <Card key={idx} className="glass-panel p-8 space-y-4 border-slate-200 dark:border-slate-800 hover:border-cyan-500/40">
              <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>


      {/* ==================== SECTION 8: TRENDING COMMUNITY SCAMS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <Badge variant="danger" size="md">LIVE THREAT BULLETIN</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Trending Scams Cataloged Recently
            </h2>
          </div>
          <Link to="/community">
            <Button size="sm" variant="secondary" icon={ArrowRight}>
              Explore Full Database
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Telegram Video Like Job Scam', category: 'Fake Job', risk: 98, reports: 524, time: '2 hours ago' },
            { title: 'Electricity Disconnection SMS', category: 'Phishing', risk: 95, reports: 412, time: '4 hours ago' },
            { title: 'WhatsApp QR Code Cash Refund', category: 'UPI Scam', risk: 92, reports: 389, time: '6 hours ago' }
          ].map((item, idx) => (
            <Card key={idx} className="glass-panel p-6 space-y-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <Badge variant="danger" size="sm">{item.category}</Badge>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{item.time}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <span className="text-slate-600 dark:text-slate-400 font-mono">{item.reports} Community Reports</span>
                <span className="font-mono font-black text-red-600 dark:text-red-400">{item.risk}% Risk Score</span>
              </div>
            </Card>
          ))}
        </div>
      </section>


      {/* ==================== SECTION 9: TESTIMONIALS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="info" size="md">USER REVIEWS</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by Citizens & Professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Rajesh Sharma',
              role: 'Cybersecurity Researcher',
              comment: 'ScamShield AI detected a sophisticated Telegram job scam screenshot that almost fooled my colleague. The OCR extraction and Gemini risk score are spot on.',
              stars: 5
            },
            {
              name: 'Priya Mukherjee',
              role: 'Fintech Product Manager',
              comment: 'The Phishing URL checker and risk score matrix give clear actionable advice. I recommend this platform to all my family members.',
              stars: 5
            },
            {
              name: 'Anand Verma',
              role: 'IT Security Administrator',
              comment: 'Exporting audit-ready PDF reports and searching community scam phone numbers has saved our employees from multiple phishing lures.',
              stars: 5
            }
          ].map((item, idx) => (
            <Card key={idx} className="glass-panel p-8 space-y-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">"{item.comment}"</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">{item.role}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>


      {/* ==================== SECTION 10: PRICING TIERS ==================== */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="info" size="md">PRICING PLANS</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Transparent Pricing Plans
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Free forever for individual citizens. Upgrade to Pro for automated API scanning and priority alerts.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-200/80 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-300 dark:border-slate-800 mx-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                billingCycle === 'monthly' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                billingCycle === 'annual' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Free Citizen */}
          <Card className="glass-panel p-8 space-y-6 flex flex-col justify-between border-slate-200 dark:border-slate-800">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Free Citizen Plan</h3>
              <div className="text-4xl font-black text-slate-900 dark:text-white font-mono">$0 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ forever</span></div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Perfect for individual scam protection.</p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Unlimited Text & URL Scans</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> 10 Screenshot OCR Scans / Month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Community Database Access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Standard PDF Reports</li>
              </ul>
            </div>
            <Link to="/register"><Button className="w-full" variant="secondary">Get Started Free</Button></Link>
          </Card>

          {/* Card 2: Security Pro */}
          <Card className="glass-panel p-8 space-y-6 flex flex-col justify-between border-cyan-500/50 glow-cyan relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              MOST POPULAR
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security Pro</h3>
              <div className="text-4xl font-black text-slate-900 dark:text-white font-mono">
                {billingCycle === 'monthly' ? '$9.99' : '$7.99'} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Advanced AI protection for families & professionals.</p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Unlimited OCR Screenshot Scans</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Real-time SMS & Caller Threat Alerts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Priority PDF Audit Export</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Family Account Sharing (Up to 5)</li>
              </ul>
            </div>
            <Link to="/register"><Button className="w-full" variant="primary">Upgrade to Pro</Button></Link>
          </Card>

          {/* Card 3: Enterprise */}
          <Card className="glass-panel p-8 space-y-6 flex flex-col justify-between border-slate-200 dark:border-slate-800">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise Shield</h3>
              <div className="text-4xl font-black text-slate-900 dark:text-white font-mono">$49 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ month</span></div>
              <p className="text-xs text-slate-600 dark:text-slate-400">API integration for apps & platforms.</p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> REST API Access for Fraud Checks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Custom Gemini AI Prompt Tuning</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> 99.9% Uptime SLA Guarantee</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Dedicated Security Support</li>
              </ul>
            </div>
            <Link to="/register"><Button className="w-full" variant="secondary">Contact Enterprise Team</Button></Link>
          </Card>
        </div>
      </section>


      {/* ==================== SECTION 11: FAQ ACCORDION ==================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="info" size="md">HELP & FAQ</Badge>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">Everything you need to know about ScamShield AI platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              className="glass-panel p-6 cursor-pointer space-y-2 transition-all hover:border-cyan-500/40 border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{faq.q}</h4>
                <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''}`} />
              </div>
              {expandedFaq === idx && (
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800/80 font-medium">
                  {faq.a}
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>


      {/* ==================== SECTION 12: CALL TO ACTION BANNER ==================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="glass-panel p-10 sm:p-14 text-center space-y-6 border-cyan-500/40 glow-cyan relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Protect Yourself Today.
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-medium">
              Scan your first suspicious message, screenshot, or URL link for free. Zero installation required.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <Link to="/scan">
              <Button size="lg" icon={Scan} variant="primary" className="px-8 py-3.5 shadow-xl text-base">
                Start Free AI Scan
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 py-3.5 text-base">
                Create Free Account
              </Button>
            </Link>
          </div>
        </Card>
      </section>

    </div>
  );
};
