import { NextResponse } from 'next/server';
import { api } from '../../../../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Placeholder endpoint to accept a reset token and new password.
// In production, verify token against DB, hash password, and update user.
export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
    if (!convexUrl) {
      return NextResponse.json({ error: 'Convex URL not configured' }, { status: 500 });
    }
    const convex = new ConvexHttpClient(convexUrl);
    try {
      await convex.mutation(api.auth.completePasswordReset, { token, password });
      return NextResponse.json({ ok: true });
    } catch (err: any) {
      const msg = err?.message || 'Reset failed';
      const status = /invalid|expired/i.test(msg) ? 400 : 500;
      return NextResponse.json({ error: msg }, { status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}


