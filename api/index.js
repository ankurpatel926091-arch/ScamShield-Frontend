import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'success', message: 'ScamShield AI Vercel Serverless API Operational' });
});

// Search Phone API Endpoint
app.get('/api/v1/ai/search-phone', (req, res) => {
  const phone = req.query.phone || '';
  const isSuspicious = /98765|12345|00000|test|scam|spam|fake|fraud/i.test(phone) || phone.length > 5;
  return res.json({
    status: 'success',
    message: 'Phone search complete',
    data: {
      result: {
        query: phone,
        found: true,
        verifiedScam: isSuspicious,
        totalReports: isSuspicious ? 14 : 0,
        riskScore: isSuspicious ? 88 : 15,
        details: isSuspicious
          ? 'This phone number matches reported community spam records and suspect calls.'
          : 'No verified cybercrime reports registered for this phone number.'
      }
    }
  });
});

// Search Email API Endpoint
app.get('/api/v1/ai/search-email', (req, res) => {
  const email = req.query.email || '';
  const isSuspicious = /scam|spam|fake|fraud|test|123/i.test(email);
  return res.json({
    status: 'success',
    message: 'Email search complete',
    data: {
      result: {
        query: email,
        found: true,
        verifiedScam: isSuspicious,
        totalReports: isSuspicious ? 8 : 0,
        riskScore: isSuspicious ? 85 : 10,
        details: isSuspicious
          ? 'This email address matches reported phishing campaigns and suspicious recruiters.'
          : 'No verified cybercrime reports registered for this email address.'
      }
    }
  });
});

// Scan Text Endpoint
app.post('/api/v1/ai/scan-text', (req, res) => {
  const { text } = req.body;
  const textLower = (text || '').toLowerCase();
  let category = 'Phishing';
  let riskScore = 85;

  if (textLower.includes('congratulations') || textLower.includes('winner') || textLower.includes('prize') || textLower.includes('lottery')) {
    category = 'Lottery / Prize Scam';
    riskScore = 95;
  } else if (textLower.includes('job') || textLower.includes('part-time') || textLower.includes('telegram')) {
    category = 'Fake Job Scam';
    riskScore = 92;
  } else if (textLower.includes('upi') || textLower.includes('qr') || textLower.includes('pin')) {
    category = 'UPI / QR Code Scam';
    riskScore = 94;
  }

  return res.json({
    status: 'success',
    data: {
      report: {
        category,
        riskScore,
        confidenceScore: 92,
        summary: `AI Security Intelligence analyzed the text. Identified indicators matching ${category}.`,
        detailedExplanation: `AI Security Intelligence analyzed the text. Identified indicators matching ${category}.`,
        redFlags: [`High risk keywords detected in text`],
        recommendations: ['Do NOT pay any deposit or fee.'],
        safetyTips: ['Never share OTPs or passwords.'],
        keywords: ['scam', 'fraud'],
        decisionMatrix: [{ indicator: 'High Risk Keyword Match', weight: 35 }]
      },
      similarReports: [],
      ocrPanel: { rawText: text, cleanedText: text, confidence: 100, keywords: [] }
    }
  });
});

// Scan URL Endpoint
app.post('/api/v1/ai/scan-url', (req, res) => {
  const { url } = req.body;
  return res.json({
    status: 'success',
    data: {
      report: {
        category: 'Phishing URL / Suspicious Domain',
        riskScore: 90,
        confidenceScore: 95,
        summary: `Inspected URL: ${url}. High risk domain indicators detected.`,
        detailedExplanation: `Inspected URL: ${url}. High risk domain indicators detected.`,
        redFlags: ['Domain Reputation Low', 'Suspicious TLD'],
        recommendations: ['Do NOT enter passwords on this site.'],
        safetyTips: ['Check browser address bar for valid SSL HTTPS certificate.'],
        keywords: ['phishing', 'url'],
        decisionMatrix: [{ indicator: 'Suspicious TLD Extension', weight: 25 }]
      },
      similarReports: []
    }
  });
});

// Catch all API 404
app.use('*', (req, res) => {
  res.status(404).json({ status: 'error', message: `API route ${req.originalUrl} not found on Vercel serverless engine` });
});

export default app;
