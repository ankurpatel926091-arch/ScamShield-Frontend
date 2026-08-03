import API from './api';

export const reportApi = {
  createReport: (data) => API.post('/reports', data),
  getReports: (params) => API.get('/reports', { params }),
  getReportById: (id) => API.get(`/reports/${id}`),
  voteReport: (id, type) => API.post(`/reports/${id}/vote`, { type }),
  addComment: (id, content) => API.post(`/reports/${id}/comments`, { content }),
  toggleBookmark: (id) => API.post(`/reports/${id}/bookmark`),
  getBookmarks: () => API.get('/reports/user/bookmarks')
};
