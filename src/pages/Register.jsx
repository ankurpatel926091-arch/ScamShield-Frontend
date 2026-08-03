import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ShieldAlert, User, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { authApi } from '../services/authApi';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const passwordValue = watch('password', '');

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(passwordValue);

  const onSubmit = async (data) => {
    setErrorMsg('');
    setLoading(true);
    try {
      await authApi.register({ name: data.name, email: data.email, password: data.password });
      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md space-y-6 glass-panel border border-slate-700/60 shadow-2xl p-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Create Free Account</h2>
          <p className="text-xs text-slate-400">Join global fraud prevention network</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="your name"
            icon={User}
            error={errors.name?.message}
            {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            icon={Mail}
            error={errors.email?.message}
            {...register('email', { required: 'Email address is required' })}
          />

          <div className="space-y-1.5">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
            />
            {passwordValue && (
              <div className="space-y-1">
                <div className="flex gap-1 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all ${strengthScore >= 1 ? 'w-1/4 bg-red-500' : ''}`} />
                  <div className={`h-full transition-all ${strengthScore >= 2 ? 'w-1/4 bg-amber-500' : ''}`} />
                  <div className={`h-full transition-all ${strengthScore >= 3 ? 'w-1/4 bg-cyan-500' : ''}`} />
                  <div className={`h-full transition-all ${strengthScore >= 4 ? 'w-1/4 bg-emerald-500' : ''}`} />
                </div>
                <p className="text-[10px] text-slate-400 font-medium text-right">
                  Strength: {strengthScore <= 1 ? 'Weak' : strengthScore === 2 ? 'Fair' : strengthScore === 3 ? 'Good' : 'Strong'}
                </p>
              </div>
            )}
          </div>

          <Button type="submit" isLoading={loading} className="w-full mt-2" size="lg" variant="primary">
            Create Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-cyan-400 hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};
