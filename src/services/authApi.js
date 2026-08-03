import API from './api';

export const authApi = {
  register: (data) => API.post('/auth/register', data),
  verifyOtp: (data) => API.post('/auth/verify-otp', data),
  login: (data) => API.post('/auth/login', data),
  logout: (refreshToken) => API.post('/auth/logout', { refreshToken }),
  forgotPassword: (data) => API.post('/auth/forgot-password', data),
  resetPassword: (data) => API.post('/auth/reset-password', data),
  getMe: () => API.get('/auth/me')
};

export const userApi = {
  getProfile: () => API.get('/user/profile'),
  updateProfile: (data) => API.put('/user/profile', data),
  changePassword: (data) => API.put('/user/change-password', data),
  getSessions: () => API.get('/user/sessions'),
  getAuditLogs: () => API.get('/user/audit-logs')
};
