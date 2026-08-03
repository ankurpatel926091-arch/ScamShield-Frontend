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
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';

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

export const AdminAnalyticsCharts = () => {
  // Bar Chart: Threat Distribution across Scam Categories
  const categoryBarData = {
    labels: ['Fake Jobs', 'Bank Fraud', 'Lottery', 'UPI Scam', 'Crypto', 'Telegram', 'Phishing', 'Electricity', 'Instagram'],
    datasets: [
      {
        label: 'Verified Scam Reports',
        data: [540, 320, 210, 480, 290, 410, 360, 190, 230],
        backgroundColor: [
          'rgba(239, 68, 68, 0.85)',
          'rgba(249, 115, 22, 0.85)',
          'rgba(234, 179, 8, 0.85)',
          'rgba(6, 182, 212, 0.85)',
          'rgba(168, 85, 247, 0.85)',
          'rgba(59, 130, 246, 0.85)',
          'rgba(16, 185, 129, 0.85)',
          'rgba(244, 63, 94, 0.85)',
          'rgba(14, 165, 233, 0.85)'
        ],
        borderRadius: 8
      }
    ]
  };

  const categoryBarOptions = {
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

  // Line Chart: Daily & Monthly Reports Trend
  const trendLineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Total Submitted Reports',
        data: [650, 920, 1100, 1450, 1800, 2200, 2600, 3100],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#06b6d4'
      },
      {
        label: 'Verified Scam Signatures',
        data: [500, 780, 910, 1200, 1500, 1900, 2250, 2750],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ef4444'
      }
    ]
  };

  const trendLineOptions = {
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

  // Doughnut Chart: AI Confidence & Accuracy Breakdown
  const accuracyDoughnutData = {
    labels: ['Verified Scam (True Pos)', 'Clean Payload (True Neg)', 'Pending Moderation', 'False Positives (<0.5%)'],
    datasets: [
      {
        data: [65, 28, 6.5, 0.5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',
          'rgba(16, 185, 129, 0.9)',
          'rgba(234, 179, 8, 0.9)',
          'rgba(59, 130, 246, 0.9)'
        ],
        borderWidth: 0
      }
    ]
  };

  const accuracyDoughnutOptions = {
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
      {/* Chart 1: Monthly Scam Growth Line (7 cols) */}
      <div className="lg:col-span-7 p-5 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">System Growth & Threat Index Velocity</h4>
            <p className="text-[11px] text-slate-400">Total submitted incident reports vs verified scam signatures</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
            SOC INTELLIGENCE
          </span>
        </div>
        <div className="h-64 w-full relative">
          <Line data={trendLineData} options={trendLineOptions} />
        </div>
      </div>

      {/* Chart 2: Threat Categories Bar Chart (5 cols) */}
      <div className="lg:col-span-5 p-5 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Scam Category Distribution</h4>
            <p className="text-[11px] text-slate-400">Incidents grouped by active scam vector</p>
          </div>
          <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/30">
            CRITICAL VECTOR
          </span>
        </div>
        <div className="h-64 w-full relative">
          <Bar data={categoryBarData} options={categoryBarOptions} />
        </div>
      </div>

      {/* Chart 3: AI Accuracy Doughnut (12 cols) */}
      <div className="lg:col-span-12 p-5 rounded-2xl glass-card border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-md">
          <h4 className="text-sm font-black uppercase tracking-wider text-white">AI Detection Engine Precision Rate</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluation of Gemini 1.5 Flash vision and Tesseract OCR heuristics across 100,000+ threat verification cycles.
          </p>
          <div className="pt-2 flex items-center gap-6 text-xs font-mono">
            <div>
              <span className="text-slate-400 block">AI Accuracy Rate</span>
              <span className="text-cyan-400 font-bold text-base">99.4%</span>
            </div>
            <div>
              <span className="text-slate-400 block">False Positive Rate</span>
              <span className="text-emerald-400 font-bold text-base">&lt;0.5%</span>
            </div>
          </div>
        </div>

        <div className="h-48 w-full md:w-96 relative">
          <Doughnut data={accuracyDoughnutData} options={accuracyDoughnutOptions} />
        </div>
      </div>
    </div>
  );
};
