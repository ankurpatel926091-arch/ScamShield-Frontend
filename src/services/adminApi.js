import API from './api';

export const adminApi = {
  getUsers: (params) => API.get('/admin/users', { params }),
  updateUserRole: (id, role) => API.patch(`/admin/users/${id}/role`, { role }),
  toggleUserBan: (id) => API.patch(`/admin/users/${id}/ban`),
  verifyReport: (id, status = 'verified') => API.patch(`/admin/reports/${id}/verify`, { status }),
  deleteReport: (id) => API.delete(`/admin/reports/${id}`),
  broadcastAnnouncement: (data) => API.post('/admin/announcement', data),
  getAuditLogs: () => API.get('/admin/audit-logs'),
  downloadCSV: async () => {
    const response = await API.get('/admin/export-csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ScamShield-Database-Export-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
