import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { reportApi } from '../services/reportApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { RiskGauge } from '../components/ai/RiskGauge';
import { ShieldAlert, ThumbsUp, ThumbsDown, MessageSquare, Bookmark, Share2, Phone, Mail, Globe, CreditCard, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await reportApi.getReportById(id);
      setReport(res.data.report);
      setComments(res.data.comments || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleVote = async (type) => {
    try {
      await reportApi.voteReport(id, type);
      fetchDetail();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await reportApi.addComment(id, newComment);
      setComments([res.data.comment, ...comments]);
      setNewComment('');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await reportApi.toggleBookmark(id);
      setIsBookmarked(res.data.isBookmarked);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
        <Skeleton className="h-12 w-48 rounded-xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Report Not Found</h2>
        <Link to="/community">
          <Button variant="primary">Return to Community Database</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/community" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Scam Explorer
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBookmark}
            className={`p-2.5 rounded-xl border transition-colors ${
              isBookmarked ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Bookmark report"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <Card className="glass-panel p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="danger" size="md">{report.category}</Badge>
              <Badge variant="neutral" size="sm">{report.scamType}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{report.title}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              Reported by <span className="font-bold text-slate-200">{report.reporter?.name || 'Anonymous User'}</span>
              <span>•</span>
              <span>{new Date(report.createdAt).toLocaleString()}</span>
            </p>
          </div>

          <RiskGauge score={report.riskScore} confidence={report.confidenceScore || 85} />
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Incident Description</h3>
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{report.description}</p>
        </div>

        {/* Evidence Images */}
        {report.evidenceUrls && report.evidenceUrls.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Uploaded Evidence Images</h3>
            <div className="flex flex-wrap gap-4">
              {report.evidenceUrls.map((url, idx) => (
                <img key={idx} src={url} alt="Evidence" className="max-h-60 rounded-xl border border-slate-700 object-cover shadow-lg" />
              ))}
            </div>
          </div>
        )}

        {/* Scammer Identifiers Card */}
        {report.scammerDetails && (
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Reported Scammer Identifiers
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {report.scammerDetails.phone && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono">{report.scammerDetails.phone}</span>
                </div>
              )}
              {report.scammerDetails.email && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono">{report.scammerDetails.email}</span>
                </div>
              )}
              {report.scammerDetails.upiId && (
                <div className="flex items-center gap-2 text-slate-300">
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono">{report.scammerDetails.upiId}</span>
                </div>
              )}
              {report.scammerDetails.website && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono">{report.scammerDetails.website}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Voting Bar */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
          <Button size="sm" variant="secondary" icon={ThumbsUp} onClick={() => handleVote('upvote')}>
            Confirm Scam ({report.upvotesCount || 0})
          </Button>
          <Button size="sm" variant="ghost" icon={ThumbsDown} onClick={() => handleVote('downvote')}>
            Dispute ({report.downvotesCount || 0})
          </Button>
        </div>
      </Card>

      {/* Discussion Thread */}
      <Card className="glass-panel p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" /> Community Comments ({comments.length})
        </h3>

        <form onSubmit={handleAddComment} className="flex gap-3">
          <input
            type="text"
            placeholder="Add a comment or additional evidence detail..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow glass-input p-3 rounded-xl text-xs border-slate-800"
          />
          <Button type="submit" isLoading={submittingComment} variant="primary" icon={Send}>
            Post
          </Button>
        </form>

        <div className="space-y-4 pt-2">
          {comments.map((comment) => (
            <div key={comment._id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400">{comment.author?.name || 'User'}</span>
                <span className="text-[10px] text-slate-500">{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-slate-300">{comment.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
