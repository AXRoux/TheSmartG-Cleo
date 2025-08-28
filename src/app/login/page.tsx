"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

function LoginPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        router.push(redirectTo);
      } else {
        setErrors({ email: '', password: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ email: '', password: 'An error occurred during login' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Video Section - Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQ8z92S0eidGSYEVmvlntLbaIKrwqkf57O3UBZ" type="video/mp4" />
        </video>
        
        {/* Brand overlay on video */}
        <div className="absolute bottom-8 left-8 z-20">
          <h2 className="text-white text-2xl font-display">The Smart Group</h2>
          <p className="text-white/80 mt-2 text-sm">Making the impossible achievable</p>
        </div>
      </div>

      {/* Mobile video background */}
      <div className="lg:hidden absolute inset-0 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQ8z92S0eidGSYEVmvlntLbaIKrwqkf57O3UBZ" type="video/mp4" />
        </video>
      </div>

      {/* Login Form Section - Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-20 lg:bg-black">
        <div className="w-full max-w-md px-8 py-12 lg:px-12">
          {/* Header */}
          <div className="mb-8">
            <div className="lg:hidden mb-6">
              <h1 className="text-white text-2xl font-display">The Smart Group</h1>
            </div>
            <Link 
              href="/" 
              className="text-white/70 hover:text-white text-sm underline transition-colors mb-4 inline-block"
            >
              Back to home
            </Link>
            <h2 className="text-3xl font-display text-white mb-2">Welcome back</h2>
            <p className="text-white/60">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-white/20 h-12"
                placeholder="Enter your email"
                disabled={isLoading}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-white/20 h-12 pr-12"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-400 text-sm" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-white/70 hover:text-white transition-colors"
                disabled={isLoading}
              >
                Forgot your password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-white text-black hover:bg-white/90 transition-colors font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black animate-spin rounded-full" />
                  Signing in...
                </div>
              ) : (
                'Log in'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-sm text-white/50">
              © 2024 The Smart Group. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <LoginPageContent />
    </Suspense>
  );
}