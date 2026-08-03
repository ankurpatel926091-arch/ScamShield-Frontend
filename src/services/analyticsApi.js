import API from './api';

export const analyticsApi = {
  getOverview: () => API.get('/analytics/overview')
};
