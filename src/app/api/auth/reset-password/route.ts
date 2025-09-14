import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Placeholder endpoint to demonstrate where reset logic would go if we move beyond magic-link
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const origin = typeof baseUrl === 'string' && baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    const token = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    const resetUrl = `${origin}/reset-password/${encodeURIComponent(token)}`;

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: 'administrator@stratir.com',
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
          <h2>The Smart Group</h2>
          <p>Click the link below to reset your password.</p>
          <p><a href="${resetUrl}">Reset Password</a></p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
  }
}


