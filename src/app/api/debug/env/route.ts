import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const required = process.env.DEBUG_ENV_TOKEN;

    // If a debug token is configured, require it; otherwise allow for temporary diagnostics
    if (required && token !== required) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resendKeyPresent = !!(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
    const nextPublicAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || null;
    const vercelUrl = process.env.VERCEL_URL?.trim() || null;
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim() || null;
    const deployment = process.env.CONVEX_DEPLOYMENT || null;

    const baseUrl = nextPublicAppUrl || vercelUrl || 'http://localhost:3000';
    const origin = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;

    return NextResponse.json({
      ok: true,
      env: {
        RESEND_API_KEY: resendKeyPresent,
        NEXT_PUBLIC_APP_URL: nextPublicAppUrl,
        NEXT_PUBLIC_CONVEX_URL: convexUrl,
        VERCEL_URL: vercelUrl,
        CONVEX_DEPLOYMENT: deployment,
        NODE_ENV: process.env.NODE_ENV || null,
      },
      derived: { origin },
      now: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'debug error' }, { status: 500 });
  }
}


