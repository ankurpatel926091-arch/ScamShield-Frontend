import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { aiApi } from '../services/aiApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { ScanReportView } from '../components/ai/ScanReportView';
import { Scan, Upload, FileText, Globe, Phone, Mail, AlertTriangle, ShieldCheck, Search, Loader2 } from 'lucide-react';

export const Scanner = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'screenshot';

  const [activeTab, setActiveTab] = useState(initialType);
  const [loading, setLoading] = useState(false);
  const [reportResult, setReportResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Tab 1: Screenshot OCR state
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');

  // Tab 2: Text state
  const [textContent, setTextContent] = useState('');

  // Tab 3: URL state
  const [urlInput, setUrlInput] = useState('');

  // Tab 4: Phone & Email state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);

  useEffect(() => {
    if (initialType) setActiveTab(initialType);
  }, [initialType]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotScan = async () => {
    if (!imageBase64 && !textContent) {
      setErrorMsg('Please upload a screenshot image or paste extracted text.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await aiApi.scanScreenshot(imageBase64, textContent);
      setReportResult(res.data.report);
    } catch (err) {
      setErrorMsg(err.message || 'Screenshot OCR processing failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextScan = async () => {
    if (!textContent || textContent.trim().length < 5) {
      setErrorMsg('Please enter at least 5 characters of suspicious text.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await aiApi.scanText(textContent, 'Text');
      setReportResult(res.data.report);
    } catch (err) {
      setErrorMsg(err.message || 'AI Text scan failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlScan = async () => {
    if (!urlInput || urlInput.trim().length < 3) {
      setErrorMsg('Please enter a valid URL.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await aiApi.scanUrl(urlInput);
      setReportResult(res.data.report);
    } catch (err) {
      setErrorMsg(err.message || 'URL security scan failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLookupSearch = async () => {
    if (!lookupQuery) return;
    setLoading(true);
    setErrorMsg('');
    setLookupResult(null);
    try {
      let res;
      if (lookupQuery.includes('@')) {
        res = await aiApi.searchEmail(lookupQuery);
      } else {
        res = await aiApi.searchPhone(lookupQuery);
      }
      setLookupResult(res.data.result);
    } catch (err) {
      setErrorMsg(err.message || 'Lookup search failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-bold text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
          <Scan className="w-4 h-4 text-cyan-500" /> Multi-Modal AI Threat Detection Center
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Analyze & Detect <span className="gradient-text">Scam Threats</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Upload screenshots, paste suspicious chat text, check website links, or search unknown callers.
        </p>
      </div>

      {/* Render AI Report View if scan complete */}
      {reportResult ? (
        <ScanReportView
          report={reportResult}
          onReset={() => setReportResult(null)}
          imagePreview={imagePreview}
          textContent={textContent || reportResult?.extractedText}
          urlInput={urlInput}
          scanType={activeTab}
        />
      ) : (
        <Card className="glass-panel p-6 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <button
              onClick={() => { setActiveTab('screenshot'); setErrorMsg(''); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Upload className="w-4 h-4" /> Screenshot OCR
            </button>

            <button
              onClick={() => { setActiveTab('text'); setErrorMsg(''); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'text'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" /> Text Fraud Analyzer
            </button>

            <button
              onClick={() => { setActiveTab('url'); setErrorMsg(''); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'url'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-4 h-4" /> Phishing URL Checker
            </button>

            <button
              onClick={() => { setActiveTab('lookup'); setErrorMsg(''); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'lookup'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Phone className="w-4 h-4" /> Phone / Email Lookup
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: Screenshot OCR */}
          {activeTab === 'screenshot' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-8 text-center bg-slate-100/80 dark:bg-slate-900/40 transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {imagePreview ? (
                  <div className="space-y-4">
                    <img src={imagePreview} alt="Screenshot Preview" className="max-h-64 mx-auto rounded-xl shadow-lg border border-slate-300 dark:border-slate-700" />
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">Click to choose a different screenshot</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Drag & drop chat screenshot here, or click to browse</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Supports PNG, JPG, WEBP formats up to 10MB</p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleScreenshotScan}
                isLoading={loading}
                disabled={!imagePreview && !textContent}
                className="w-full"
                size="lg"
                variant="primary"
                icon={Scan}
              >
                {loading ? 'Running OCR & AI Intelligence Analysis...' : 'Scan Screenshot Now'}
              </Button>
            </div>
          )}

          {/* TAB 2: Text Scanner */}
          {activeTab === 'text' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                  Paste Suspicious Chat Message / Email Content
                </label>
                <textarea
                  rows={6}
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Paste WhatsApp message, Telegram job offer text, SMS, or suspicious email body here..."
                  className="w-full glass-input p-4 rounded-xl text-sm transition-all border-slate-300 dark:border-slate-800 focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <Button
                onClick={handleTextScan}
                isLoading={loading}
                disabled={!textContent}
                className="w-full"
                size="lg"
                variant="primary"
                icon={Scan}
              >
                Analyze Fraud Risk
              </Button>
            </div>
          )}

          {/* TAB 3: URL Scanner */}
          {activeTab === 'url' && (
            <div className="space-y-5">
              <Input
                label="Enter Suspicious Website URL"
                placeholder="https://example-phishing-login.xyz"
                icon={Globe}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />

              <Button
                onClick={handleUrlScan}
                isLoading={loading}
                disabled={!urlInput}
                className="w-full"
                size="lg"
                variant="primary"
                icon={Scan}
              >
                Inspect Link Security
              </Button>
            </div>
          )}

          {/* TAB 4: Phone & Email Search */}
          {activeTab === 'lookup' && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <Input
                  containerClassName="flex-grow"
                  placeholder="Enter phone number (+91...) or email address..."
                  icon={Search}
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                />
                <Button onClick={handleLookupSearch} isLoading={loading} variant="primary">
                  Search Database
                </Button>
              </div>

              {lookupResult && (
                <Card className="glass-card p-6 space-y-4 border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Search Result for: {lookupResult.query}</h4>
                    <Badge variant={lookupResult.verifiedScam ? 'danger' : lookupResult.found ? 'warning' : 'success'} size="md">
                      {lookupResult.verifiedScam ? 'VERIFIED FRAUDSTER' : lookupResult.found ? 'REPORTED SUSPECT' : 'NO REPORTS FOUND'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Total Community Reports:</span>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{lookupResult.totalReports}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Threat Risk Level:</span>
                      <p className="text-lg font-black text-red-600 dark:text-red-400">{lookupResult.riskScore}/100</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
