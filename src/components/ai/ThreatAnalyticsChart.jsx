import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const ThreatAnalyticsChart = ({ riskScore = 85, category = 'Fake Job' }) => {
  const radarData = {
    labels: ['Financial Lure', 'Artificial Urgency', 'Anonymity Vector', 'Domain Reputation', 'Payload Risk', 'Social Engineering'],
    datasets: [
      {
        label: 'Detected Risk Vector',
        data: [
          Math.min(100, riskScore + 5),
          Math.min(100, Math.max(40, riskScore - 10)),
          Math.min(100, riskScore + 8),
          Math.min(100, Math.max(30, riskScore - 20)),
          Math.min(100, Math.max(50, riskScore - 5)),
          Math.min(100, riskScore)
        ],
        backgroundColor: riskScore > 80 ? 'rgba(239, 68, 68, 0.25)' : riskScore > 60 ? 'rgba(249, 115, 22, 0.25)' : 'rgba(6, 182, 212, 0.25)',
        borderColor: riskScore > 80 ? '#ef4444' : riskScore > 60 ? '#f97316' : '#06b6d4',
        borderWidth: 2,
        pointBackgroundColor: riskScore > 80 ? '#ef4444' : '#06b6d4',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: riskScore > 80 ? '#ef4444' : '#06b6d4'
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: {
          color: '#94a3b8',
          font: { size: 10, weight: 'bold' }
        },
        ticks: { display: false },
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#38bdf8',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1
      }
    }
  };

  const barData = {
    labels: ['Registration Fee', 'Urgency', 'Suspicious URL', 'Unknown Domain', 'High Salary'],
    datasets: [
      {
        label: 'Threat Weight Score',
        data: [25, 20, 30, 15, 8],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderRadius: 6
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
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 10 } }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Radar Chart */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Threat Vector Matrix</span>
          <span className="text-[10px] text-cyan-400 font-mono">Radar Analysis</span>
        </div>
        <div className="h-52 w-full relative">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Risk Contribution Weights</span>
          <span className="text-[10px] text-cyan-400 font-mono">Score Breakdown</span>
        </div>
        <div className="h-52 w-full relative">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};
