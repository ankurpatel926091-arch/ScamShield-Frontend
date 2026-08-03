import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../services/analyticsApi';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, ShieldAlert, AlertTriangle, Users, FileText, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.getOverview()
      .then(res => {
        setData(res.data.data);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 space-y-6">
        <Skeleton className="h-12 w-64 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  const { overview, categoryChart, riskChart, monthlyChart, topIdentifiers } = data || {};

  const monthlyBarData = {
    labels: monthlyChart?.labels || [],
    datasets: [
      {
        label: 'Scam Incidents Reported',
        data: monthlyChart?.data || [],
        backgroundColor: 'rgba(6, 182, 212, 0.7)',
        borderColor: '#06b6d4',
        borderWidth: 1.5,
        borderRadius: 8
      }
    ]
  };

  const categoryDoughnutData = {
    labels: categoryChart?.labels || [],
    datasets: [
      {
        data: categoryChart?.data || [],
        backgroundColor: [
          '#ef4444',
          '#f97316',
          '#f59e0b',
          '#06b6d4',
          '#3b82f6',
          '#8b5cf6',
          '#ec4899'
        ],
        borderWidth: 0
      }
    ]
  };

  const riskDoughnutData = {
    labels: riskChart?.labels || [],
    datasets: [
      {
        data: riskChart?.data || [],
        backgroundColor: ['#10b981', '#f59e0b', '#f97316', '#ef4444'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans', size: 11 }
        }
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <Activity className="w-8 h-8 text-cyan-400" /> ScamShield Intelligence Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time threat metrics, category risk distributions, and monthly fraud trends.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-panel space-y-2">
          <span className="text-xs font-semibold text-slate-400">Total Scams Tracked</span>
          <p className="text-3xl font-black text-white">{overview?.totalReports || 0}</p>
        </Card>
        <Card className="glass-panel space-y-2">
          <span className="text-xs font-semibold text-slate-400">Verified Fraud Database</span>
          <p className="text-3xl font-black text-cyan-400">{overview?.verifiedScams || 0}</p>
        </Card>
        <Card className="glass-panel space-y-2">
          <span className="text-xs font-semibold text-slate-400">Blacklisted Phone / Email ID</span>
          <p className="text-3xl font-black text-red-400">{overview?.totalScamIdentifiers || 0}</p>
        </Card>
        <Card className="glass-panel space-y-2">
          <span className="text-xs font-semibold text-slate-400">Protected Platform Users</span>
          <p className="text-3xl font-black text-emerald-400">{overview?.totalUsers || 0}</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Monthly Trends */}
        <Card className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" /> Monthly Fraud Incident Trends
          </h3>
          <div className="h-72">
            <Bar data={monthlyBarData} options={chartOptions} />
          </div>
        </Card>

        {/* Doughnut Chart: Category Distribution */}
        <Card className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-purple-400" /> Scam Category Breakdown
          </h3>
          <div className="h-72 flex items-center justify-center">
            <Doughnut data={categoryDoughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </Card>
      </div>

      {/* Top Scammer Target Table */}
      <Card className="glass-panel p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" /> Top Reported Blacklisted Identifiers
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Identifier</th>
                <th className="p-3">Type</th>
                <th className="p-3">Reports Count</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {(topIdentifiers || []).length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-500 italic">No blacklisted identifiers cataloged yet.</td>
                </tr>
              ) : (
                topIdentifiers.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-mono font-bold text-cyan-300">{item.identifier}</td>
                    <td className="p-3 uppercase font-semibold">{item.type}</td>
                    <td className="p-3 font-black text-red-400">{item.totalReports}</td>
                    <td className="p-3">
                      <Badge variant="danger" size="sm">CONFIRMED FRAUD</Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
