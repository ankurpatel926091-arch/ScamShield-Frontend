import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportApi } from '../services/reportApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { Search, Filter, ThumbsUp, MessageSquare, ShieldAlert, Eye, PlusCircle, ArrowRight } from 'lucide-react';

export const Community = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });

  const categories = [
    'All',
    'Phishing',
    'Fake Job',
    'UPI / QR Code',
    'Bank Scam',
    'Telegram Scam',
    'WhatsApp Fraud',
    'Crypto Fraud',
    'Investment Trap'
  ];

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await reportApi.getReports({
        query,
        category: selectedCategory === 'All' ? '' : selectedCategory,
        page,
        limit: 9
      });
      setReports(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [selectedCategory, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchReports();
  };

  const handleVote = async (e, reportId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await reportApi.voteReport(reportId, 'upvote');
      fetchReports();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            Community Scam Database Explorer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search verified community scam reports, UPI handles, phone numbers, and phishing domains.
          </p>
        </div>

        <Link to="/report/new">
          <Button variant="primary" icon={PlusCircle}>
            Report New Scam
          </Button>
        </Link>
      </div>

      {/* Search Bar & Category Pills */}
      <div className="space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <Input
            containerClassName="flex-grow"
            placeholder="Search scam title, description, phone number, email, or UPI ID..."
            icon={Search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </form>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = (cat === 'All' && !selectedCategory) || selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat === 'All' ? '' : cat);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : reports.length === 0 ? (
        <Card className="glass-panel p-12 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Scam Reports Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No matching scam reports found for your query. Be the first to report a suspicious incident!
          </p>
          <Link to="/report/new">
            <Button variant="primary" icon={PlusCircle}>
              Submit Scam Report
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Link key={report._id} to={`/report/${report._id}`}>
              <Card className="glass-panel p-6 space-y-4 flex flex-col justify-between h-full hover:border-cyan-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        report.riskScore >= 80
                          ? 'danger'
                          : report.riskScore >= 50
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                    >
                      Risk: {report.riskScore}/100
                    </Badge>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-2 hover:text-cyan-400 transition-colors">
                    {report.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {report.description}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <button
                    onClick={(e) => handleVote(e, report._id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{report.upvotesCount || 0}</span>
                  </button>

                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {report.viewsCount || 0}
                    </span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-0.5">
                      Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6">
          <Button
            size="sm"
            variant="secondary"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-xs font-semibold text-slate-400">
            Page {page} of {pagination.totalPages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
