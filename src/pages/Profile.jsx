import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../services/authApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { User, Shield, KeyRound, Clock, Activity, Laptop, CheckCircle2, AlertCircle } from 'lucide-react';

export const Profile = () => {
  const { user, updateUserState } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');
  const [loadingPass, setLoadingPass] = useState(false);

  // Activity & Sessions
  const [sessions, setSessions] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    if (activeTab === 'security') {
      userApi.getSessions().then(res => setSessions(res.data.sessions || [])).catch(() => {});
      userApi.getAuditLogs().then(res => setAuditLogs(res.data.logs || [])).catch(() => {});
    }
  }, [activeTab]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    setProfileErr('');
    setLoadingProfile(true);
    try {
      const res = await userApi.updateProfile({ name, avatar });
      updateUserState(res.data.user);
      setProfileMsg('Profile updated successfully!');
    } catch (err) {
      setProfileErr(err.message || 'Failed to update profile.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassMsg('');
    setPassErr('');
    setLoadingPass(true);
    try {
      const res = await userApi.changePassword({ currentPassword, newPassword });
      setPassMsg(res.message || 'Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPassErr(err.message || 'Failed to change password.');
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Profile Header Banner */}
      <Card className="glass-panel p-6 border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-xl"
          />
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              {user?.name}
              {user?.isVerified && (
                <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-500/20" title="Verified Account" />
              )}
            </h1>
            <p className="text-xs text-slate-400 font-mono">{user?.email}</p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant={user?.role === 'admin' ? 'danger' : user?.role === 'moderator' ? 'warning' : 'info'} size="sm">
                Role: {user?.role?.toUpperCase()}
              </Badge>
              <Badge variant="success" size="sm">Active Account</Badge>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'profile' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'security' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Security & Activity
          </button>
        </div>
      </Card>

      {/* Tab 1: Profile Settings */}
      {activeTab === 'profile' && (
        <Card className="glass-panel p-8 space-y-6 max-w-2xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" /> Account Details
          </h2>

          {profileErr && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {profileErr}
            </div>
          )}

          {profileMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {profileMsg}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={User}
              required
            />
            <Input
              label="Avatar Image URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
            />

            <Button type="submit" isLoading={loadingProfile} variant="primary" size="md">
              Save Changes
            </Button>
          </form>
        </Card>
      )}

      {/* Tab 2: Security & Sessions */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Change Password Form */}
          <Card className="glass-panel p-6 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-cyan-400" /> Change Password
            </h2>

            {passErr && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {passErr}
              </div>
            )}

            {passMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {passMsg}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button type="submit" isLoading={loadingPass} variant="primary" size="md">
                Update Password
              </Button>
            </form>
          </Card>

          {/* Activity Audit Log */}
          <Card className="glass-panel p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" /> Activity Timeline
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {auditLogs.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No recent activity logged.</p>
              ) : (
                auditLogs.map((log) => (
                  <div key={log._id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-cyan-300">{log.action}</span>
                      <p className="text-slate-400 text-[10px]">{new Date(log.createdAt).toLocaleString()}</p>
                    </div>
                    <Badge variant="neutral" size="sm">{log.ipAddress || '127.0.0.1'}</Badge>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
