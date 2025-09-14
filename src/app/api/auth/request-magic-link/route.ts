import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { api } from '../../../../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This endpoint sends a passwordless login link to admins. For now, we support the seeded admin only.
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Proceed for any email; we'll avoid enumeration by returning ok if not found later

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || process.env.VERCEL_URL?.trim() || 'http://localhost:3000';
    const origin = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;

    // Create a Convex token record
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
    if (!convexUrl) {
      return NextResponse.json({ error: 'Convex URL not configured' }, { status: 500 });
    }
    const convex = new ConvexHttpClient(convexUrl);
    // Ensure the seeded admin account exists (no-op if already there)
    try { await convex.mutation(api.auth.initializeTestAccount, {}); } catch (_) {}
    const created = await convex.mutation(api.auth.createPasswordResetToken, { email });
    // If user isn't found, respond OK without sending an email to prevent enumeration
    if (!created || !created.token) {
      return NextResponse.json({ ok: true });
    }
    const resetUrl = `${origin}/reset-password/${encodeURIComponent(created.token)}`;

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: 'administrator@stratir.com',
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
          <h2>The Smart Group</h2>
          <p>Click the secure link below to reset your password. This link will expire in 30 minutes.</p>
          <p><a href="${resetUrl}">Reset your password</a></p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('request-magic-link error:', error?.message || error, error?.stack);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}


