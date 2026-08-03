import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reportApi } from '../services/reportApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ShieldAlert, PlusCircle, AlertCircle, Phone, Mail, Globe, CreditCard, Hash, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export const NewReport = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scamType, setScamType] = useState('Text');
  const [category, setCategory] = useState(searchParams.get('category') || 'Phishing');
  const [riskScore, setRiskScore] = useState(parseInt(searchParams.get('riskScore') || '75', 10));

  // Scammer details
  const [scammerPhone, setScammerPhone] = useState('');
  const [scammerEmail, setScammerEmail] = useState('');
  const [scammerWebsite, setScammerWebsite] = useState('');
  const [scammerUpi, setScammerUpi] = useState('');
  const [scammerHandle, setScammerHandle] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    'Phishing',
    'Fake Job',
    'Lottery / Prize',
    'UPI / QR Code',
    'Bank Scam',
    'Telegram Scam',
    'WhatsApp Fraud',
    'Crypto Fraud',
    'Investment Trap',
    'Loan Scam',
    'Instagram Impersonation',
    'Fake Internship',
    'E-Commerce Fraud',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!title || !description) {
      setErrorMsg('Please fill in report title and detailed description.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        description,
        scamType,
        category,
        riskScore,
        evidenceUrls: evidenceUrl ? [evidenceUrl] : [],
        scammerDetails: {
          phone: scammerPhone,
          email: scammerEmail,
          website: scammerWebsite,
          upiId: scammerUpi,
          socialHandle: scammerHandle
        }
      };

      const res = await reportApi.createReport(payload);
      navigate(`/report/${res.data.report._id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit report. Please check input fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-white">Report a Scam Incident</h1>
        <p className="text-xs text-slate-400">
          Help protect millions of users by documenting fraudulent activities and scammer identifiers.
        </p>
      </div>

      <Card className="glass-panel p-8 space-y-6">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Input
            label="Report Title"
            placeholder="e.g. Telegram Part-Time Job Rating Deposit Scam"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Scam Type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Scam Medium Type
              </label>
              <select
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
                className="w-full glass-input p-2.5 rounded-xl text-sm border-slate-800"
              >
                <option value="Text">Text Message / SMS</option>
                <option value="Screenshot">Screenshot Evidence</option>
                <option value="URL">Phishing URL / Website</option>
                <option value="Phone">Phone Call / WhatsApp Call</option>
                <option value="Email">Phishing Email</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full glass-input p-2.5 rounded-xl text-sm border-slate-800"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Detailed Scam Incident Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how the scam happened, message body, transaction amounts requested, etc."
              className="w-full glass-input p-3.5 rounded-xl text-sm border-slate-800 focus:ring-2 focus:ring-cyan-500/50"
              required
            />
          </div>

          {/* Scammer Details Section */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Scammer Identifiers (Optional but Recommended)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Scammer Phone Number"
                placeholder="+91 9876543210"
                icon={Phone}
                value={scammerPhone}
                onChange={(e) => setScammerPhone(e.target.value)}
              />
              <Input
                label="Scammer Email"
                placeholder="fraudster@domain.com"
                icon={Mail}
                value={scammerEmail}
                onChange={(e) => setScammerEmail(e.target.value)}
              />
              <Input
                label="Fraudulent UPI ID"
                placeholder="scammer@paytm / okaxis"
                icon={CreditCard}
                value={scammerUpi}
                onChange={(e) => setScammerUpi(e.target.value)}
              />
              <Input
                label="Phishing Website"
                placeholder="https://fake-login-bank.com"
                icon={Globe}
                value={scammerWebsite}
                onChange={(e) => setScammerWebsite(e.target.value)}
              />
            </div>
          </div>

          {/* Evidence URL & Risk Slider */}
          <Input
            label="Evidence Image URL (Screenshot Upload Link)"
            placeholder="https://images.unsplash.com/photo-..."
            icon={LinkIcon}
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
          />

          <Button type="submit" isLoading={loading} className="w-full" size="lg" variant="primary" icon={PlusCircle}>
            Publish Scam Report
          </Button>
        </form>
      </Card>
    </div>
  );
};
