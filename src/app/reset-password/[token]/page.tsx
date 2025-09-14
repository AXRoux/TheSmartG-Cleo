"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/complete-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      if (res.ok) {
        setMessage('Password updated. You can now sign in.');
        setTimeout(() => router.push('/login'), 1200);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md px-8 py-12">
        <div className="mb-8">
          <Link href="/login" className="text-white/70 hover:text-white text-sm underline transition-colors mb-4 inline-block">
            Back to login
          </Link>
          <h1 className="text-3xl font-display text-white mb-2">Reset password</h1>
          <p className="text-white/60">Enter a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white text-sm font-medium">New password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-white/20 h-12"
              placeholder="Enter a new password"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-white text-sm font-medium">Confirm password</Label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-white/20 h-12"
              placeholder="Re-enter your new password"
              disabled={isSubmitting}
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm" role="alert">{error}</p>
          )}
          {message && (
            <p className="text-emerald-400 text-sm" role="status">{message}</p>
          )}

          <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 transition-colors font-medium" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}


