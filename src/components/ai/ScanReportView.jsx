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
  Zap,
  ExternalLink,
  Tag,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScanReportView = ({
  report,
  ocrPanel = null,
  similarReports = [],
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

  const rawExtractedText = ocrPanel?.rawText || textContent || report?.extractedText || report?.rawText || '';
  const cleanedExtractedText = ocrPanel?.cleanedText || rawExtractedText;
  const ocrConfidence = ocrPanel?.confidence || report?.confidenceScore || report?.confidence || 95;
  const detectedKeywords = ocrPanel?.keywords || report?.keywords || [];

  const scanTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  const scanId = `SCAM-${Math.floor(100000 + Math.random() * 900000)}`;

  // Copy OCR Text
  const handleCopyOCR = () => {
    navigator.clipboard.writeText(cleanedExtractedText || rawExtractedText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Copy AI Summary
  const handleCopySummary = () => {
    const summaryText = `[ScamShield AI Security Report #${scanId}]\nCategory: ${report?.category || 'Analyzed Content'}\nRisk Score: ${report?.riskScore || 0}/100\nExplanation: ${report?.summary || report?.detailedExplanation}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Download Extracted Text File
  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([cleanedExtractedText || rawExtractedText], { type: 'text/plain' });
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
        title: `ScamShield AI Security Report #${scanId}`,
        text: `Threat Risk: ${report?.riskScore || 0}% - ${report?.category || 'Scam'} Analysis.`,
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
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  // Highlighting suspicious keywords in OCR text
  const renderHighlightedText = (text) => {
    if (!text) return 'No text detected in target payload.';
    const keywordsRegex = /(₹\s*\d+|[0-9]+\s*rupees|registration fee|deposit|telegram|immediate joining|click here|urgent|pay fee|upi|qr code|guaranteed|commission|part-time|whatsapp|work from home|lottery|prize|bank|account|kyc|apk)/gi;
    const parts = text.split(keywordsRegex);

    return parts.map((part, index) => {
      if (keywordsRegex.test(part)) {
        return (
          <span
            key={index}
            className="bg-red-500/25 border-b-2 border-red-500 text-red-300 font-bold px-1 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse inline-block my-0.5"
            title="Flagged Threat Keyword"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Threat Evidence / Red Flags List
  const redFlagsList = Array.isArray(report?.redFlags) && report.redFlags.length > 0
    ? report.redFlags
    : Array.isArray(report?.reasons) && report.reasons.length > 0
    ? report.reasons
    : [];

  // Decision Matrix Items
  const decisionMatrixItems = Array.isArray(report?.decisionMatrix) && report.decisionMatrix.length > 0
    ? report.decisionMatrix
    : redFlagsList.map((rf, i) => ({
        indicator: rf,
        weight: i === 0 ? 30 : i === 1 ? 25 : i === 2 ? 20 : 15
      }));

  // Recommendations & Safety Tips
  const recommendationsList = Array.isArray(report?.recommendations) && report.recommendations.length > 0
    ? report.recommendations
    : Array.isArray(report?.safetyTips) && report.safetyTips.length > 0
    ? report.safetyTips
    : [];

  const reasoningList = Array.isArray(report?.reasoning) ? report.reasoning : [];

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

      {/* TOP BAR: Action Controls */}
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
            icon={Bookmark}
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

          <Link to={`/report/new?category=${encodeURIComponent(report?.category || '')}&riskScore=${report?.riskScore || 0}`}>
            <Button size="sm" variant="primary" icon={PlusCircle}>
              Report to Community
            </Button>
          </Link>
        </div>
      </div>

      {/* EXECUTIVE SECURITY HEADER BANNER */}
      <div className={`p-6 rounded-2xl glass-panel relative overflow-hidden border ${report?.riskScore > 80 ? 'border-red-500/40 glow-danger' : report?.riskScore > 60 ? 'border-orange-500/40' : report?.riskScore > 30 ? 'border-amber-500/40' : 'border-emerald-500/30'}`}>
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
              Threat Category: <span className="gradient-text">{report?.category || 'Scam Analysis'}</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Dynamically generated AI cybersecurity analysis calculated strictly from payload OCR text, Gemini LLM reasoning, and threat heuristics.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Calculated Risk Level</span>
              <span className={`text-xl font-black font-mono tracking-tight ${report?.riskScore > 80 ? 'text-red-400' : report?.riskScore > 60 ? 'text-orange-400' : report?.riskScore > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {report?.riskScore > 80 ? 'CRITICAL THREAT' : report?.riskScore > 60 ? 'HIGH THREAT' : report?.riskScore > 30 ? 'MODERATE RISK' : 'SAFE / LOW RISK'}
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
                <Eye className="w-4 h-4 text-cyan-400" /> Inspected Payload
              </h3>
              <Badge variant="info" size="sm">
                {scanType.toUpperCase()} MODE
              </Badge>
            </div>

            {imagePreview ? (
              <div className="relative group rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 p-2 text-center">
                <img
                  src={imagePreview}
                  alt="Target Payload"
                  className="max-h-72 w-full object-contain mx-auto rounded-lg transition-transform group-hover:scale-105"
                />
              </div>
            ) : urlInput ? (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Target URL</span>
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

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Scan ID</span>
                <span className="font-mono text-white font-bold">{scanId}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">OCR Confidence</span>
                <span className="font-mono text-emerald-400 font-bold">{ocrConfidence}%</span>
              </div>
            </div>
          </Card>

          {/* CARD 2: DYNAMIC OCR PANEL */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
                  OCR Text Pipeline Panel
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyOCR}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-colors border border-slate-700"
                >
                  {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedText ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleDownloadText}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-colors border border-slate-700"
                >
                  <Download className="w-3 h-3" /> Save
                </button>
              </div>
            </div>

            {/* OCR Confidence Gauge Bar */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Tesseract OCR Confidence Score:</span>
                <span className={ocrConfidence >= 70 ? 'text-emerald-400' : 'text-amber-400'}>{ocrConfidence}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all ${ocrConfidence >= 70 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                  style={{ width: `${Math.min(100, Math.max(0, ocrConfidence))}%` }}
                />
              </div>
            </div>

            {/* Cleaned OCR Text View */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Normalized & Cleaned Text</span>
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 font-mono text-xs text-slate-300 leading-relaxed max-h-56 overflow-y-auto">
                {renderHighlightedText(cleanedExtractedText)}
              </div>
            </div>

            {/* Original Raw Text View (collapsible) */}
            {rawExtractedText && rawExtractedText !== cleanedExtractedText && (
              <details className="text-xs text-slate-400 cursor-pointer">
                <summary className="font-bold hover:text-slate-200">View Raw OCR Output</summary>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 font-mono text-[11px] text-slate-400 mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {rawExtractedText}
                </div>
              </details>
            )}

            {/* Detected Keywords Badges */}
            {detectedKeywords.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Tag className="w-3 h-3 text-cyan-400" /> Extracted Threat Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {detectedKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-mono font-bold"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* CARD 3: SIMILAR REPORTS FROM DATABASE */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-4 h-4 text-cyan-400" /> Database Search: Similar Reports
            </h3>

            {similarReports && similarReports.length > 0 ? (
              <div className="space-y-3">
                {similarReports.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{item.title || item.category}</span>
                      <Badge variant={item.riskScore > 70 ? 'danger' : 'warning'} size="sm">
                        Risk {item.riskScore}%
                      </Badge>
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center space-y-1">
                <Search className="w-6 h-6 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-bold">No similar reports found in database.</p>
                <p className="text-[11px] text-slate-500">This content vector has not been previously flagged by users.</p>
              </div>
            )}
          </Card>

        </div>


        {/* ==================== RIGHT COLUMN (7 cols) ==================== */}
        <div className="lg:col-span-7 space-y-6">

          {/* CARD 1: Animated Risk Score Gauge */}
          <RiskGauge score={report?.riskScore || 0} confidence={report?.confidenceScore || ocrConfidence} />

          {/* CARD 2: Threat Summary & AI Explanation */}
          <Card hover={false} className="glass-panel p-6 space-y-4 border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400" /> AI Executive Intelligence Summary
              </h3>
              <Badge variant={report?.riskScore > 80 ? 'danger' : report?.riskScore > 60 ? 'warning' : 'success'} size="sm">
                VERDICT: {report?.category || 'ANALYZED'}
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-3">
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {report?.summary || report?.detailedExplanation || 'No summary available.'}
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Threat Category: <strong className="text-cyan-400">{report?.category || 'N/A'}</strong></span>
                <span>AI Confidence Rating: <strong className="text-emerald-400">{report?.confidenceScore || ocrConfidence}%</strong></span>
              </div>
            </div>
          </Card>

          {/* CARD 3: DECISION MATRIX (Risk Breakdown) */}
          {decisionMatrixItems.length > 0 && (
            <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
              <div
                className="flex items-center justify-between cursor-pointer select-none border-b border-slate-800 pb-3"
                onClick={() => setShowDecisionProcess(!showDecisionProcess)}
              >
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> AI Decision Matrix & Score Weights
                </h3>
                <button className="text-slate-400 hover:text-white">
                  {showDecisionProcess ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {showDecisionProcess && (
                <div className="space-y-2.5 pt-1">
                  {decisionMatrixItems.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{item.indicator || item.keyword || item.label || item}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-cyan-400">+{item.weight || 20}</span>
                      </div>
                    </div>
                  ))}
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs font-bold text-white mt-2">
                    <span className="uppercase font-extrabold tracking-wider">Calculated Composite Risk Score</span>
                    <span className="font-mono text-base text-cyan-300 font-black">{report?.riskScore || 0}%</span>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* CARD 4: THREAT EVIDENCE & RED FLAGS */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Threat Evidence & Red Flags
            </h3>

            {redFlagsList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {redFlagsList.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-300 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                      <span>{typeof item === 'string' ? item : item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
                ✓ No critical red flags detected in payload.
              </div>
            )}
          </Card>

          {/* CARD 5: AI REASONING STEPS */}
          {reasoningList.length > 0 && (
            <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Activity className="w-4 h-4 text-cyan-400" /> AI Step-by-Step Security Reasoning
              </h3>
              <div className="space-y-2 text-xs">
                {reasoningList.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-start gap-2.5">
                    <span className="font-mono text-cyan-400 font-bold">[{idx + 1}]</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* CARD 6: CATEGORY-SPECIFIC RECOMMENDATIONS */}
          <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Category-Specific Recommendations
            </h3>

            {recommendationsList.length > 0 ? (
              <div className="space-y-2.5">
                {recommendationsList.map((rec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed font-medium">{rec}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No specific recommendations.</p>
            )}
          </Card>

        </div>
      </div>
    </motion.div>
  );
};
