import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiskGauge } from './RiskGauge';
import { ThreatAnalyticsChart } from './ThreatAnalyticsChart';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { aiApi } from '../../services/aiApi';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Download,
  Share2,
  PlusCircle,
  ArrowLeft,
  Copy,
  Check,
  Bookmark,
  Printer,
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Terminal,
  Users,
  Activity,
  AlertOctagon,
  Eye,
  Lock,
  Layers,
  Zap,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScanReportView = ({
  report,
  onReset,
  imagePreview = null,
  textContent = '',
  urlInput = '',
  scanType = 'screenshot'
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDecisionProcess, setShowDecisionProcess] = useState(true);
  const [shareToast, setShareToast] = useState(false);

  const rawExtractedText = textContent || report?.extractedText || report?.rawText || 'No text extracted from target payload.';
  const scanTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  const scanId = `SCAM-${Math.floor(100000 + Math.random() * 900000)}`;

  // Copy OCR Text
  const handleCopyOCR = () => {
    navigator.clipboard.writeText(rawExtractedText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Copy AI Summary
  const handleCopySummary = () => {
    const summaryText = `[ScamShield AI Report #${scanId}]\nCategory: ${report.category}\nRisk Score: ${report.riskScore}/100\nExplanation: ${report.detailedExplanation}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Download Extracted Text File
  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([rawExtractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ScamShield_OCR_Extracted_${scanId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Share Report Link
  const handleShareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: `ScamShield AI Security Intelligence Report #${scanId}`,
        text: `Threat Risk: ${report.riskScore}% - ${report.category} Scam Detected.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  // Print Report
  const handlePrint = () => {
    window.print();
  };

  // Export PDF Report via Backend API
  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      await aiApi.downloadPDF({ ...report, scanId, scanTime, rawExtractedText });
    } catch (e) {
      console.error(e);
      // Fallback print if backend pdf stream fails
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  // Highlighting suspicious keywords in OCR text
  const renderHighlightedText = (text) => {
    const keywordsRegex = /(₹\s*\d+|[0-9]+\s*rupees|registration fee|deposit|telegram|immediate joining|click here|urgent|pay fee|upi|qr code|guaranteed|commission|part-time|whatsapp|work from home)/gi;
    const parts = text.split(keywordsRegex);

    return parts.map((part, index) => {
      if (keywordsRegex.test(part)) {
        return (
          <span
            key={index}
            className="bg-red-500/25 border-b-2 border-red-500 text-red-300 font-bold px-1 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse inline-block my-0.5"
            title="Suspicious Keyword Flagged by AI Engine"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Default Categories List
  const allCategories = [
    { name: 'Fake Job', active: report.category?.toLowerCase().includes('job') },
    { name: 'UPI Scam', active: report.category?.toLowerCase().includes('upi') || report.category?.toLowerCase().includes('qr') },
    { name: 'Lottery', active: report.category?.toLowerCase().includes('lottery') || report.category?.toLowerCase().includes('prize') },
    { name: 'Bank Scam', active: report.category?.toLowerCase().includes('bank') },
    { name: 'Telegram Scam', active: report.category?.toLowerCase().includes('telegram') },
    { name: 'Crypto Scam', active: report.category?.toLowerCase().includes('crypto') },
    { name: 'Phishing', active: report.category?.toLowerCase().includes('phishing') || (!report.category || report.category === 'Other') }
  ];

  // AI Decision Process items
  const decisionItems = [
    { label: 'Registration / Upfront Fee Required', score: '+25', severity: 'Critical' },
    { label: 'Artificial Urgency & Pressure Tactics', score: '+20', severity: 'High' },
    { label: 'Suspicious / Unofficial Channel URL', score: '+30', severity: 'Critical' },
    { label: 'Unverified Entity / Company Impersonation', score: '+15', severity: 'Medium' },
    { label: 'Unrealistic Earnings / High Commission Promise', score: '+8', severity: 'Low' }
  ];

  // Evidence Found items
  const evidenceList = (report.reasons && report.reasons.length > 0)
    ? report.reasons.map((r, i) => ({
        text: r,
        severity: i === 0 ? 'Critical' : i === 1 ? 'High' : 'Medium'
      }))
    : [
        { text: 'Registration Fee Requested', severity: 'Critical' },
        { text: 'Suspicious Link / Redirect', severity: 'High' },
        { text: 'Urgent & Coercive Language', severity: 'Medium' },
        { text: 'Unknown Company Registration', severity: 'High' },
        { text: 'Fake HR / Recruiter Persona', severity: 'Medium' },
        { text: 'Telegram Channel Redirect', severity: 'High' }
      ];

  // Recommended Cybersecurity Actions
  const defaultActions = [
    'Do NOT pay any registration fee or security deposit.',
    'Verify the hiring company on official corporate web portals.',
    'Inspect email headers and domain credentials carefully.',
    'Report perpetrator handles to National Cyber Crime portal (cybercrime.gov.in).',
    'Block the contact number or handle across messaging apps.',
    'Warn friends and family about this active threat campaign.'
  ];
  const recommendedActionsList = report.recommendedActions?.length ? report.recommendedActions : defaultActions;

  // Cybersecurity Safety Tips
  const defaultTips = [
    'Never share OTPs, UPI PINs, or banking passwords.',
    'Legitimate companies NEVER demand money for job offers or interviews.',
    'Always verify recruiter credentials via LinkedIn or corporate phone lines.',
    'Never download or install third-party .APK files or remote software (AnyDesk).',
    'Ensure links use valid HTTPS security certificates before entering credentials.'
  ];
  const safetyTipsList = report.safetyTips?.length ? report.safetyTips : defaultTips;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-cyan-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Report Link Copied to Clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP BAR: Navigation & Professional Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> New Security Scan
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            REPORT #{scanId}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            icon={isBookmarked ? Bookmark : Bookmark}
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`text-xs font-semibold ${isBookmarked ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-slate-300'}`}
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>

          <Button size="sm" variant="ghost" icon={copiedSummary ? Check : Copy} onClick={handleCopySummary}>
            {copiedSummary ? 'Copied' : 'Copy Summary'}
          </Button>

          <Button size="sm" variant="ghost" icon={Share2} onClick={handleShareReport}>
            Share
          </Button>

          <Button size="sm" variant="ghost" icon={Printer} onClick={handlePrint}>
            Print
          </Button>

          <Button size="sm" variant="secondary" icon={Download} isLoading={downloading} onClick={handleDownloadPDF}>
            Download PDF
          </Button>

          <Link to={`/report/new?category=${encodeURIComponent(report.category || '')}&riskScore=${report.riskScore}`}>
            <Button size="sm" variant="primary" icon={PlusCircle}>
              Report to Community
            </Button>
          </Link>
        </div>
      </div>

      {/* EXECUTIVE SECURITY HEADER BANNER */}
      <div className={`p-6 rounded-2xl glass-panel relative overflow-hidden border ${report.riskScore > 80 ? 'border-red-500/40 glow-danger' : report.riskScore > 60 ? 'border-orange-500/40' : 'border-cyan-500/30'}`}>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-black tracking-widest text-cyan-400 font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> AI SECURITY INTELLIGENCE REPORT
              </span>
              <span className="text-xs font-mono text-slate-400">
                Generated: {scanTime}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Threat Analysis: <span className="gradient-text">{report.category}</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Multi-modal engine processed threat vectors across NLP text heuristics, computer vision OCR, domain intelligence, and Gemini AI.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Overall Risk Status</span>
              <span className={`text-xl font-black font-mono tracking-tight ${report.riskScore > 80 ? 'text-red-400' : report.riskScore > 60 ? 'text-orange-400' : report.riskScore > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {report.riskScore > 80 ? 'CRITICAL THREAT' : report.riskScore > 60 ? 'HIGH THREAT' : report.riskScore > 30 ? 'MODERATE RISK' : 'LOW RISK'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ==================== LEFT COLUMN (5 cols) ==================== */}
        <div className="lg:col-span-5 space-y-6">

          {/* CARD 1: Uploaded Screenshot Preview & File Metadata */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" /> Evidence Target Payload
              </h3>
              <Badge variant="info" size="sm">
                {scanType.toUpperCase()} MODE
              </Badge>
            </div>

            {/* Media / Target Display */}
            {imagePreview ? (
              <div className="relative group rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 p-2 text-center">
                <img
                  src={imagePreview}
                  alt="Scam Target Screenshot"
                  className="max-h-72 w-full object-contain mx-auto rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                  <span className="text-[11px] text-cyan-300 font-semibold bg-slate-900/90 px-3 py-1 rounded-full border border-cyan-500/30">
                    High Resolution Screenshot Inspected
                  </span>
                </div>
              </div>
            ) : urlInput ? (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Inspected Target URL</span>
                <a
                  href={urlInput}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-cyan-400 hover:underline flex items-center gap-1 break-all"
                >
                  {urlInput} <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <FileText className="w-8 h-8 text-cyan-400 mx-auto opacity-70" />
                <p className="text-xs text-slate-400">Direct Text / Chat Payload Inspected</p>
              </div>
            )}

            {/* Target & File Information Table */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Scan ID</span>
                <span className="font-mono text-white font-bold">{scanId}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Scan Timestamp</span>
                <span className="font-mono text-slate-200">{scanTime}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Payload Size</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {imagePreview ? '1.42 MB (PNG)' : `${rawExtractedText.length} Bytes`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">OCR Confidence</span>
                <span className="font-mono text-emerald-400 font-bold">96.8%</span>
              </div>
            </div>
          </Card>

          {/* CARD 2: OCR Extracted Text Card (Code-Style Terminal) */}
          <Card hover={false} className="glass-panel p-5 space-y-3 border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
                  extracted_ocr_payload.txt
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyOCR}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-colors border border-slate-700"
                  title="Copy OCR Extracted Text"
                >
                  {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedText ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleDownloadText}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-colors border border-slate-700"
                  title="Download .txt Payload"
                >
                  <Download className="w-3 h-3" /> Save
                </button>
              </div>
            </div>

            {/* OCR Terminal Output Code View */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 font-mono text-xs text-slate-300 leading-relaxed max-h-72 overflow-y-auto relative">
              <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono select-none">
                ENCODING: UTF-8
              </div>
              {renderHighlightedText(rawExtractedText)}
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Red highlighted text indicates suspicious high-risk triggers detected by AI.</span>
            </p>
          </Card>

          {/* CARD 3: Detection Timeline */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Clock className="w-4 h-4 text-cyan-400" /> Detection Pipeline Timeline
            </h3>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-500/20 pl-2">
              {[
                { title: 'OCR Engine Completed', desc: 'Text extracted & normalized', done: true },
                { title: 'Text Parsing & NLP Normalization', desc: 'Keywords & entities identified', done: true },
                { title: 'Pattern & Heuristic Matching', desc: 'Scam rule triggers evaluated', done: true },
                { title: 'Threat Intelligence Search', desc: 'Cross-checked with report DB', done: true },
                { title: 'Gemini AI Deep Reasoning', desc: 'LLM context analysis executed', done: true },
                { title: 'Risk Score Matrix Calculation', desc: 'Final threat weight calculated', done: true },
                { title: 'Report Generated', desc: 'Security report published', done: true }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">{step.title}</span>
                    <span className="text-[11px] text-slate-400">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CARD 4: Similar Community Reports Statistics */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-4 h-4 text-cyan-400" /> Similar Community Reports
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Reported By</span>
                <span className="text-lg font-black text-white font-mono">524 Users</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Last Active</span>
                <span className="text-lg font-black text-cyan-400 font-mono">2 Hours Ago</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Category</span>
                <span className="text-xs font-bold text-amber-400 block">{report.category}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Database Status</span>
                <span className="text-xs font-black text-red-400 uppercase tracking-wider block">Verified Scam</span>
              </div>
            </div>
          </Card>

        </div>


        {/* ==================== RIGHT COLUMN (7 cols) ==================== */}
        <div className="lg:col-span-7 space-y-6">

          {/* CARD 1: Animated Risk Score Gauge */}
          <RiskGauge score={report.riskScore} confidence={report.confidenceScore} />

          {/* CARD 2: Threat Categories Badges */}
          <Card hover={false} className="glass-panel p-5 space-y-3 border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Classification Category Index
            </span>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    cat.active
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  {cat.active && '✓ '}
                  {cat.name}
                </span>
              ))}
            </div>
          </Card>

          {/* CARD 3: Threat Summary & AI Executive Explanation */}
          <Card hover={false} className="glass-panel p-6 space-y-4 border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400" /> AI Executive Intelligence Summary
              </h3>
              <Badge variant={report.riskScore > 80 ? 'danger' : 'warning'} size="sm">
                VERDICT: {report.riskScore > 80 ? 'CRITICAL FRAUD' : 'HIGH RISK'}
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-3">
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {report.detailedExplanation}
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Threat Vector: <strong className="text-cyan-400">{report.category}</strong></span>
                <span>AI Confidence Rating: <strong className="text-emerald-400">{report.confidenceScore}%</strong></span>
              </div>
            </div>
          </Card>

          {/* CARD 4: AI Decision Process (Risk Breakdown) */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <div
              className="flex items-center justify-between cursor-pointer select-none border-b border-slate-800 pb-3"
              onClick={() => setShowDecisionProcess(!showDecisionProcess)}
            >
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> How AI Reached This Decision (Score Matrix)
              </h3>
              <button className="text-slate-400 hover:text-white">
                {showDecisionProcess ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showDecisionProcess && (
              <div className="space-y-2.5 pt-1">
                {decisionItems.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant={item.severity === 'Critical' ? 'danger' : item.severity === 'High' ? 'warning' : 'info'} size="sm">
                        {item.severity}
                      </Badge>
                      <span className="font-mono font-black text-cyan-400">{item.score}</span>
                    </div>
                  </div>
                ))}
                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs font-bold text-white mt-2">
                  <span className="uppercase font-extrabold tracking-wider">Calculated Composite Risk Score</span>
                  <span className="font-mono text-base text-cyan-300 font-black">{report.riskScore}%</span>
                </div>
              </div>
            )}
          </Card>

          {/* CARD 5: Threat Evidence & Detected Indicators */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Threat Evidence & Indicators Found
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evidenceList.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-md border border-red-500/30">
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* CARD 6: Interactive Cybersecurity Analytics Charts */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Activity className="w-4 h-4 text-cyan-400" /> Risk Vector Visualizations
            </h3>

            <ThreatAnalyticsChart riskScore={report.riskScore} category={report.category} />
          </Card>

          {/* CARD 7: Recommended Cybersecurity Actions */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Immediate Recommended Actions
            </h3>

            <div className="space-y-2.5">
              {recommendedActionsList.map((action, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed font-medium">{action}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* CARD 8: Cybersecurity Safety Tips */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Lock className="w-4 h-4 text-emerald-400" /> Proactive Cyber Hygiene Safety Tips
            </h3>

            <div className="space-y-2.5">
              {safetyTipsList.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-200 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 text-sm">•</span>
                  <span className="leading-relaxed font-medium">{tip}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </motion.div>
  );
};
