import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const DashboardAnalyticsCharts = () => {
  // Bar Chart: Threat Distribution by Category
  const barData = {
    labels: ['Fake Job', 'UPI Scam', 'Lottery', 'Bank Scam', 'Telegram', 'Phishing', 'Crypto'],
    datasets: [
      {
        label: 'Detected Threat Incidents',
        data: [420, 310, 180, 240, 390, 280, 150],
        backgroundColor: [
          'rgba(239, 68, 68, 0.85)',
          'rgba(249, 115, 22, 0.85)',
          'rgba(234, 179, 8, 0.85)',
          'rgba(168, 85, 247, 0.85)',
          'rgba(6, 182, 212, 0.85)',
          'rgba(59, 130, 246, 0.85)',
          'rgba(16, 185, 129, 0.85)'
        ],
        borderRadius: 8
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#38bdf8',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10, weight: 'bold' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 10 } }
      }
    }
  };

  // Line Chart: Scans & Threats Trend Over Time
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total AI Scans',
        data: [120, 190, 300, 250, 420, 380, 510],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#06b6d4'
      },
      {
        label: 'Threats Blocked',
        data: [45, 80, 110, 95, 160, 140, 210],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ef4444'
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#cbd5e1', font: { size: 11, weight: 'bold' } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#38bdf8',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 10 } }
      }
    }
  };

  // Doughnut Chart: Risk Level Breakdown
  const doughnutData = {
    labels: ['Critical (>80%)', 'High (60-80%)', 'Medium (30-60%)', 'Safe (<30%)'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',
          'rgba(249, 115, 22, 0.9)',
          'rgba(234, 179, 8, 0.9)',
          'rgba(16, 185, 129, 0.9)'
        ],
        borderWidth: 0
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#cbd5e1', font: { size: 10, weight: 'bold' }, padding: 12 }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#38bdf8',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1
      }
    },
    cutout: '70%'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Chart 1: Scans & Threats Trend Line (7 cols) */}
      <div className="lg:col-span-7 p-5 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Weekly Threat & Scan Activity</h4>
            <p className="text-[11px] text-slate-400">7-day scan velocity vs blocked threat volume</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
            REALTIME FEED
          </span>
        </div>
        <div className="h-60 w-full relative">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Chart 2: Threat Categories Bar Chart (5 cols) */}
      <div className="lg:col-span-5 p-5 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Threat Vectors by Category</h4>
            <p className="text-[11px] text-slate-400">Distribution across active fraud types</p>
          </div>
          <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/30">
            CRITICAL VECTOR
          </span>
        </div>
        <div className="h-60 w-full relative">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Chart 3: Risk Level Breakdown Doughnut (Entire Row / 12 cols sub) */}
      <div className="lg:col-span-12 p-5 rounded-2xl glass-card border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-sm">
          <h4 className="text-sm font-black uppercase tracking-wider text-white">Overall Severity Distribution</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Composite risk breakdown calculated across all multi-modal scans performed this month.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 block">Critical Ratio</span>
              <span className="text-red-400 font-bold text-sm">35.0%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Safe Ratio</span>
              <span className="text-emerald-400 font-bold text-sm">20.0%</span>
            </div>
          </div>
        </div>

        <div className="h-44 w-full md:w-80 relative">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};
