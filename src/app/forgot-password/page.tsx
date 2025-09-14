"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/request-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setMessage('If the email is recognized, a login link has been sent.');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || 'Unable to send email. Please try again later.');
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
          <h1 className="text-3xl font-display text-white mb-2">Forgot password</h1>
          <p className="text-white/60">We'll email you a secure reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-medium">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-white/20 h-12"
              placeholder="you@stratir.com"
              aria-describedby={error ? 'email-error' : undefined}
              disabled={isSubmitting}
              required
            />
            {error && (
              <p id="email-error" className="text-red-400 text-sm" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="text-emerald-400 text-sm" role="status">
                {message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 transition-colors font-medium" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-white/50">
            © 2024 The Smart Group. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}


