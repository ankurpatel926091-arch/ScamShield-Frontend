import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DashboardAnalyticsCharts } from '../components/dashboard/DashboardAnalyticsCharts';
import { Scanner } from './Scanner';
import { Community } from './Community';
import { Analytics } from './Analytics';
import { Profile } from './Profile';
import {
  ShieldCheck,
  Scan,
  AlertTriangle,
  FileText,
  PlusCircle,
  Search,
  Bookmark,
  History,
  Activity,
  Zap,
  Globe,
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  Users,
  ShieldAlert,
  Terminal,
  Cpu,
  Layers,
  Database,
  Download,
  Printer,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
  MapPin,
  Lock,
  Eye,
  LayoutDashboard,
  Settings,
  Shield,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

export const Dashboard = () => {
  const { user, logoutState, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active tab state from URL params (defaults to 'overview')
  const activeTab = searchParams.get('tab') || 'overview';
  const scannerType = searchParams.get('type') || 'screenshot';

  // Component states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [exportToast, setExportToast] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logoutState();
    navigate('/login');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Scan ID,Category,Risk Score,Status,Timestamp\n#SC-89412,Fake Job,98%,Critical,2026-08-03\n#SC-89411,Phishing,95%,Critical,2026-08-03\n#SC-89410,UPI Scam,92%,High,2026-08-02\n#SC-89409,Bank Scam,25%,Safe,2026-08-02";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ScamShield_Threat_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setExportToast(true);
    setTimeout(() => setExportToast(false), 2500);
  };

  // Mock Recent Scans Data
  const recentScansData = [
    { id: '#SC-89412', target: 'Telegram Part-time Job Screenshot', category: 'Fake Job', risk: 98, status: 'Critical', time: '10 mins ago', date: '03 Aug 2026' },
    { id: '#SC-89411', target: 'Electricity Disconnection SMS link', category: 'Phishing', risk: 95, status: 'Critical', time: '45 mins ago', date: '03 Aug 2026' },
    { id: '#SC-89410', target: 'http://paytm-reward-claim.xyz', category: 'UPI Scam', risk: 92, status: 'High', time: '2 hours ago', date: '03 Aug 2026' },
    { id: '#SC-89409', target: 'Official HDFC Netbanking SMS', category: 'Bank Scam', risk: 15, status: 'Safe', time: '5 hours ago', date: '02 Aug 2026' },
    { id: '#SC-89408', target: 'Caller +91 98765 43210 Lookup', category: 'Phone Lookup', risk: 88, status: 'High', time: '1 day ago', date: '02 Aug 2026' }
  ];

  const filteredScans = recentScansData.filter((item) => {
    const matchesSearch = item.target.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Navigation click handler
  const handleNavClick = (tabId, subType) => {
    setMobileSidebarOpen(false);
    if (tabId === 'admin') {
      navigate('/admin');
      return;
    }
    if (subType) {
      setSearchParams({ tab: 'scanner', type: subType });
    } else {
      setSearchParams({ tab: tabId });
    }
  };

  // Sidebar Links Structure
  const sidebarLinks = [
    { id: 'overview', label: 'Dashboard Console', icon: LayoutDashboard, isActive: activeTab === 'overview' },
    { id: 'scanner', label: 'AI Threat Scanner', icon: Scan, isActive: activeTab === 'scanner' && scannerType === 'screenshot' },
    { id: 'scanner', subType: 'screenshot', label: 'Screenshot OCR', icon: Eye, isActive: activeTab === 'scanner' && scannerType === 'screenshot' },
    { id: 'scanner', subType: 'text', label: 'Text & Email Analyzer', icon: FileText, isActive: activeTab === 'scanner' && scannerType === 'text' },
    { id: 'scanner', subType: 'url', label: 'Phishing URL Checker', icon: Globe, isActive: activeTab === 'scanner' && scannerType === 'url' },
    { id: 'scanner', subType: 'lookup', label: 'Phone & Email Lookup', icon: Search, isActive: activeTab === 'scanner' && scannerType === 'lookup' },
    { id: 'community', label: 'Community Reports', icon: Users, isActive: activeTab === 'community' },
    { id: 'analytics', label: 'Scam Database & Index', icon: Database, isActive: activeTab === 'analytics' },
    { id: 'bookmarks', label: 'My Saved Bookmarks', icon: Bookmark, isActive: activeTab === 'bookmarks' },
    { id: 'history', label: 'Scan Audit History', icon: History, isActive: activeTab === 'history' },
    { id: 'profile', label: 'Profile & Settings', icon: User, isActive: activeTab === 'profile' }
  ];

  if (isAdmin) {
    sidebarLinks.push({ id: 'admin', label: 'Admin Console', icon: ShieldAlert, path: '/admin' });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {exportToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-cyan-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> CSV Security Report Downloaded!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== LEFT SIDEBAR NAVIGATION (PERSISTENT STICKY) ==================== */}
      <aside className={`
        ${mobileSidebarOpen ? 'flex' : 'hidden'} md:flex flex-col w-64 border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-xl shrink-0 p-4 space-y-6 min-h-screen sticky top-0 h-screen overflow-y-auto z-40
      `}>
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">
            ScamShield <span className="gradient-text font-black">AI</span>
          </span>
        </Link>

        {/* Console Mode Indicator */}
        <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-[11px] font-mono font-bold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          CYBER CONSOLE ACTIVE
        </div>

        {/* Sidebar Nav Items */}
        <nav className="space-y-1 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
            Threat Intelligence Modules
          </span>
          {sidebarLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(link.id, link.subType)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                link.isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <link.icon className="w-4 h-4 shrink-0 text-cyan-400" />
              <span className="truncate">{link.label}</span>
            </button>
          ))}
        </nav>

        {/* User Footer Profile Card */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center border border-cyan-400/30">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white truncate max-w-[110px]">{user?.name || 'SecOps User'}</span>
                <span className="text-[10px] text-cyan-400 font-mono">SEC-ANALYST</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR TOGGLE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-cyan-400" />
          <span className="font-extrabold text-base text-white">ScamShield AI</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-slate-300 hover:bg-slate-900"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>


      {/* ==================== MAIN CONTENT AREA ==================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR CONSOLE HEADER */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Quick Search Console */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threat reports, scan IDs, phone numbers, or domain links..."
              className="w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs border-slate-800 font-mono"
            />
          </div>

          {/* Right Header Status Controls */}
          <div className="flex items-center gap-3">
            
            {/* Realtime Engine Status Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>GEMINI 1.5 FLASH ONLINE</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5 animate-ping" />
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel p-4 space-y-3 border border-slate-800 shadow-2xl z-50">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Threat Alerts</span>
                    <span className="text-[10px] text-cyan-400 font-mono">3 New</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 space-y-1">
                      <span className="font-bold block">New Telegram Job Scam Flagged</span>
                      <span className="text-[10px] text-slate-400 block">524 Community reports filed today.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 space-y-1">
                      <span className="font-bold block">Gemini 1.5 Flash Model Updated</span>
                      <span className="text-[10px] text-slate-400 block">Improved OCR keyword heuristics active.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Threat Scan Button */}
            <button onClick={() => handleNavClick('scanner', 'screenshot')}>
              <Button size="sm" variant="primary" icon={Scan} className="glow-cyan text-xs">
                Quick Scan
              </Button>
            </button>
          </div>
        </header>

        {/* MAIN DASHBOARD CONTENT SCROLL VIEW */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* TAB 1: OVERVIEW MAIN CONSOLE */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/30 glow-cyan">
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        ACTIVE SHIELD ENGAGED
                      </span>
                      <span className="text-xs font-mono text-slate-400">Last Scan: Just now</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      Welcome back, <span className="gradient-text">{user?.name || 'Security Analyst'}</span> 👋
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Real-time threat monitoring system actively scanning suspicious screenshots, URLs, and community scam reports.
                    </p>
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                    <Button size="sm" variant="ghost" icon={Download} onClick={handleExportCSV}>
                      Export CSV
                    </Button>
                    <Button size="sm" variant="ghost" icon={Printer} onClick={() => window.print()}>
                      Print Report
                    </Button>
                    <Link to="/report/new">
                      <Button size="sm" variant="secondary" icon={PlusCircle}>
                        Report Scam
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Security Overview Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Total AI Scans', val: '1,248', change: '+14% this week', icon: Scan, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
                  { label: 'Threats Detected', val: '342', change: 'Critical flagged', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
                  { label: 'Safe Verified Items', val: '906', change: 'Clean payloads', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
                  { label: 'Protection Score', val: '98%', change: 'All systems safe', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' }
                ].map((stat, idx) => (
                  <Card key={idx} hover={false} className="glass-panel p-5 space-y-3 border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                      <div className={`p-2 rounded-xl border ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">{stat.val}</div>
                    <span className="text-[11px] text-slate-400 font-mono block">{stat.change}</span>
                  </Card>
                ))}
              </div>

              {/* Real-time Threat Stream */}
              <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-white font-mono">
                      Live Threat Monitoring Stream
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                    LIVE FEED ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-red-400 font-mono font-bold">10:42:15 AM</span>
                      <Badge variant="danger" size="sm">CRITICAL</Badge>
                    </div>
                    <span className="font-bold text-white block">Telegram Job Scam Flagged</span>
                    <p className="text-[11px] text-slate-400">Upfront ₹1000 deposit lure detected.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-orange-400 font-mono font-bold">10:39:08 AM</span>
                      <Badge variant="warning" size="sm">HIGH RISK</Badge>
                    </div>
                    <span className="font-bold text-white block">Phishing URL .xyz Domain</span>
                    <p className="text-[11px] text-slate-400">Fake Paytm cashback claim link blocked.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">10:35:42 AM</span>
                      <Badge variant="success" size="sm">SAFE</Badge>
                    </div>
                    <span className="font-bold text-white block">HDFC Bank SMS Verification</span>
                    <p className="text-[11px] text-slate-400">Official domain credentials validated.</p>
                  </div>
                </div>
              </Card>

              {/* AI Insights & Analytics */}
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> AI Threat Intelligence Insights & Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  {[
                    { title: '85% Job Scams', text: 'Demand upfront registration fees', color: 'border-red-500/30 bg-red-500/10 text-red-300' },
                    { title: 'UPI QR Scams +24%', text: 'Surged across WhatsApp messages', color: 'border-orange-500/30 bg-orange-500/10 text-orange-300' },
                    { title: 'Telegram Traps', text: 'Highest active fraud channel', color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' },
                    { title: 'Lottery Traps -12%', text: 'Decreased compared to last month', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' }
                  ].map((insight, i) => (
                    <div key={i} className={`p-3 rounded-xl border ${insight.color} space-y-1`}>
                      <span className="font-bold block">{insight.title}</span>
                      <span className="text-[11px] text-slate-300">{insight.text}</span>
                    </div>
                  ))}
                </div>

                <DashboardAnalyticsCharts />
              </div>

              {/* Recent Scans Table */}
              <Card hover={false} className="glass-panel p-5 space-y-4 border-slate-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-white font-mono">
                      Recent Threat Incident Records
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">Category:</span>
                    {['All', 'Fake Job', 'Phishing', 'UPI Scam', 'Bank Scam'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all border ${
                          categoryFilter === cat
                            ? 'bg-cyan-500 text-white border-cyan-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono font-bold">
                        <th className="py-3 px-3">Scan ID</th>
                        <th className="py-3 px-3">Target Payload</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Risk Score</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Timestamp</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredScans.map((scan) => (
                        <tr key={scan.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-3 font-mono font-bold text-cyan-400">{scan.id}</td>
                          <td className="py-3.5 px-3 max-w-xs truncate text-slate-200">{scan.target}</td>
                          <td className="py-3.5 px-3">
                            <Badge variant="info" size="sm">{scan.category}</Badge>
                          </td>
                          <td className="py-3.5 px-3 font-mono font-bold">
                            <span className={scan.risk > 80 ? 'text-red-400' : scan.risk > 60 ? 'text-orange-400' : 'text-emerald-400'}>
                              {scan.risk}%
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <Badge variant={scan.status === 'Critical' ? 'danger' : scan.status === 'High' ? 'warning' : 'success'} size="sm">
                              {scan.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-3 text-slate-400 font-mono">{scan.time}</td>
                          <td className="py-3.5 px-3 text-right space-x-1">
                            <button
                              onClick={() => handleNavClick('scanner', 'screenshot')}
                              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Heat map & Hygiene */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card hover={false} className="lg:col-span-7 glass-panel p-5 space-y-4 border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-white font-mono flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400" /> Regional Cyber Threat Heat Zones
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono">UPDATED HOURLY</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    {[
                      { region: 'Delhi NCR', risk: '94% High', trend: 'Telegram Job Traps' },
                      { region: 'Mumbai', risk: '91% High', trend: 'UPI QR Refund Scam' },
                      { region: 'Bengaluru', risk: '88% High', trend: 'Fake Tech Internships' },
                      { region: 'Hyderabad', risk: '85% Med', trend: 'Electricity SMS Traps' },
                      { region: 'Pune', risk: '82% Med', trend: 'Crypto Airdrop Fraud' },
                      { region: 'Global Remote', risk: '96% High', trend: 'WhatsApp Phishing' }
                    ].map((zone, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                        <span className="font-bold text-white block">{zone.region}</span>
                        <span className="text-[11px] font-mono text-red-400 block font-bold">{zone.risk}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{zone.trend}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card hover={false} className="lg:col-span-5 glass-panel p-5 space-y-4 border-slate-800">
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" /> Personalized Security Hygiene
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    {[
                      'Never pay registration or security fees for job offers.',
                      'Verify recruiter credentials on official corporate portals.',
                      'Enable Two-Factor Authentication (2FA) across accounts.',
                      'Never share UPI PIN to receive money into your bank.'
                    ].map((tip, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{tip}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 2: AI THREAT SCANNER */}
          {activeTab === 'scanner' && (
            <div className="space-y-4">
              <Scanner />
            </div>
          )}

          {/* TAB 3: COMMUNITY REPORTS */}
          {activeTab === 'community' && (
            <div className="space-y-4">
              <Community />
            </div>
          )}

          {/* TAB 4: THREAT ANALYTICS & SCAM DATABASE */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <Analytics />
            </div>
          )}

          {/* TAB 5: PROFILE & SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <Profile />
            </div>
          )}

          {/* TAB 6: MY SAVED BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <Card hover={false} className="glass-panel p-6 space-y-4 border-slate-800">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-cyan-400" /> Saved Bookmarked Threat Signatures
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Quickly access verified scams you bookmarked for monitoring.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="danger" size="sm">CRITICAL (98%)</Badge>
                    <span className="text-[10px] text-slate-500 font-mono">Bookmarked 2h ago</span>
                  </div>
                  <span className="font-bold text-white text-sm block">Telegram Part-time Work-from-Home Scam</span>
                  <p className="text-slate-400 text-xs">Demands ₹1000 deposit for YouTube liking task.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="warning" size="sm">HIGH RISK (92%)</Badge>
                    <span className="text-[10px] text-slate-500 font-mono">Bookmarked 1d ago</span>
                  </div>
                  <span className="font-bold text-white text-sm block">Electricity Bill Disconnection APK Link</span>
                  <p className="text-slate-400 text-xs">Sends malicious APK file via WhatsApp SMS.</p>
                </div>
              </div>
            </Card>
          )}

          {/* TAB 7: SCAN AUDIT HISTORY */}
          {activeTab === 'history' && (
            <Card hover={false} className="glass-panel p-6 space-y-4 border-slate-800">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-400" /> Personal Scan Audit History Log
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Chronological trail of your AI scan analyses.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono font-bold">
                      <th className="py-3 px-3">Scan ID</th>
                      <th className="py-3 px-3">Target Payload</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Risk Score</th>
                      <th className="py-3 px-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                    {recentScansData.map((scan) => (
                      <tr key={scan.id} className="hover:bg-slate-900/50">
                        <td className="py-3 px-3 font-mono font-bold text-cyan-400">{scan.id}</td>
                        <td className="py-3 px-3 font-bold text-white">{scan.target}</td>
                        <td className="py-3 px-3"><Badge variant="info" size="sm">{scan.category}</Badge></td>
                        <td className="py-3 px-3 font-mono font-bold text-red-400">{scan.risk}%</td>
                        <td className="py-3 px-3 font-mono text-slate-400">{scan.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

        </main>
      </div>

    </div>
  );
};
