import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { aiApi } from '../services/aiApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { ScanReportView } from '../components/ai/ScanReportView';
import {
  Scan,
  Upload,
  FileText,
  Globe,
  Phone,
  Mail,
  AlertTriangle,
  ShieldCheck,
  Search,
  Loader2,
  Camera,
  RefreshCw,
  X
} from 'lucide-react';

export const Scanner = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'screenshot';

  const [activeTab, setActiveTab] = useState(initialType);
  const [loading, setLoading] = useState(false);
  const [reportResult, setReportResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Tab 1: Screenshot & Camera OCR state
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');

  // Camera State
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' or 'environment'
  const [cameraError, setCameraError] = useState('');

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

  // Clean up camera stream when component unmounts or tab changes
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Bind video element srcObject when cameraStream or videoRef changes
  useEffect(() => {
    if (isCameraActive && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [isCameraActive, cameraStream]);

  const startCamera = async (mode = facingMode) => {
    setErrorMsg('');
    setCameraError('');
    setIsCameraActive(true);
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
    } catch (err) {
      console.error('Camera access error:', err);
      setIsCameraActive(false);
      setCameraError('Unable to access device camera. Please check browser permissions or upload an image file.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setImagePreview(dataUrl);
    setImageBase64(dataUrl);
    stopCamera();
    handleScreenshotScan(dataUrl);
  };

  const toggleCameraFacing = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setImagePreview(dataUrl);
        setImageBase64(dataUrl);
        handleScreenshotScan(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotScan = async (overrideBase64) => {
    const payloadBase64 = overrideBase64 || imageBase64;
    if (!payloadBase64 && !textContent) {
      setErrorMsg('Please upload a screenshot image, take a camera photo, or paste extracted text.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await aiApi.scanScreenshot(payloadBase64, textContent);
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
          Upload screenshots, take live camera photos, paste suspicious chat text, check website links, or search unknown callers.
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
              onClick={() => {
                setActiveTab('screenshot');
                setErrorMsg('');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Upload className="w-4 h-4" /> Screenshot & Camera OCR
            </button>

            <button
              onClick={() => {
                setActiveTab('text');
                setErrorMsg('');
                stopCamera();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'text'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" /> Text Fraud Analyzer
            </button>

            <button
              onClick={() => {
                setActiveTab('url');
                setErrorMsg('');
                stopCamera();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'url'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-4 h-4" /> Phishing URL Checker
            </button>

            <button
              onClick={() => {
                setActiveTab('lookup');
                setErrorMsg('');
                stopCamera();
              }}
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

          {/* TAB 1: Screenshot & Camera OCR */}
          {activeTab === 'screenshot' && (
            <div className="space-y-6">
              {/* Mode Selector / Controls Bar */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Upload className="w-4 h-4 text-cyan-500" />
                  <span>Choose Input Method:</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isCameraActive ? (
                    <Button
                      size="sm"
                      variant="primary"
                      icon={Camera}
                      onClick={() => startCamera()}
                    >
                      Open Live Camera
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="danger"
                      icon={X}
                      onClick={stopCamera}
                    >
                      Close Camera
                    </Button>
                  )}
                </div>
              </div>

              {cameraError && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{cameraError}</span>
                </div>
              )}

              {/* Live Camera Feed View */}
              {isCameraActive ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/50 bg-black p-3 space-y-4 shadow-2xl">
                  <div className="relative rounded-xl overflow-hidden bg-slate-950 max-h-96 flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full max-h-96 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      LIVE CAMERA ACTIVE
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1 pb-1">
                    <Button
                      size="md"
                      variant="secondary"
                      icon={RefreshCw}
                      onClick={toggleCameraFacing}
                      title="Switch Camera"
                    >
                      Flip Camera
                    </Button>
                    <Button
                      size="lg"
                      variant="primary"
                      icon={Camera}
                      onClick={capturePhoto}
                      className="glow-cyan px-8"
                    >
                      Snap & Capture Photo
                    </Button>
                    <Button
                      size="md"
                      variant="ghost"
                      icon={X}
                      onClick={stopCamera}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                /* Standard Dropzone or Preview Box */
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-8 text-center bg-slate-100/80 dark:bg-slate-900/40 transition-colors relative cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Screenshot Preview"
                        className="max-h-64 mx-auto rounded-xl shadow-lg border border-slate-300 dark:border-slate-700"
                      />
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
                          Click to upload a different photo
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startCamera();
                          }}
                          className="px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-xs text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1.5 border border-cyan-500/30 transition-colors"
                        >
                          <Camera className="w-3.5 h-3.5" /> Retake with Live Camera
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Camera className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Drag & drop screenshot, browse file, or snap with Live Camera
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Supports PNG, JPG, WEBP formats up to 10MB
                        </p>
                      </div>
                      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <span className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold inline-flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" /> Upload File
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startCamera();
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                        >
                          <Camera className="w-3.5 h-3.5" /> Open Live Camera
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={handleScreenshotScan}
                isLoading={loading}
                disabled={!imagePreview && !textContent}
                className="w-full"
                size="lg"
                variant="primary"
                icon={Scan}
              >
                {loading ? 'Running OCR & AI Intelligence Analysis...' : 'Scan Photo / Screenshot Now'}
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
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Search Result for: {lookupResult.query}
                    </h4>
                    <Badge
                      variant={lookupResult.verifiedScam ? 'danger' : lookupResult.found ? 'warning' : 'success'}
                      size="md"
                    >
                      {lookupResult.verifiedScam
                        ? 'VERIFIED FRAUDSTER'
                        : lookupResult.found
                        ? 'REPORTED SUSPECT'
                        : 'NO REPORTS FOUND'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Total Community Reports:</span>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{lookupResult.totalReports}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Threat Risk Level:</span>
                      <p className="text-lg font-black text-red-600 dark:text-red-400">
                        {lookupResult.riskScore}/100
                      </p>
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
