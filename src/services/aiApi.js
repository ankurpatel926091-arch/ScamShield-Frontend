import API from './api';

export const aiApi = {
  scanText: (text, type = 'Text') => API.post('/ai/scan-text', { text, type }),
  scanScreenshot: (imageBase64, extractedText) => API.post('/ai/scan-screenshot', { imageBase64, extractedText }),
  scanUrl: (url) => API.post('/ai/scan-url', { url }),
  searchPhone: (phone) => API.get(`/ai/search-phone?phone=${encodeURIComponent(phone)}`),
  searchEmail: (email) => API.get(`/ai/search-email?email=${encodeURIComponent(email)}`),
  downloadPDF: async (reportData) => {
    const response = await API.post('/ai/export-pdf', reportData, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ScamShield-AI-Report-${Date.now()}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
