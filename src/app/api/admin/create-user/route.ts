import { NextResponse } from 'next/server';
import { api } from '../../../../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, password, name, role, token } = await request.json();
    if (!email || !password || !token) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const setupToken = process.env.ADMIN_SETUP_TOKEN;
    if (!setupToken || token !== setupToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return NextResponse.json({ error: 'Convex URL not configured' }, { status: 500 });
    }
    const convex = new ConvexHttpClient(convexUrl);
    const userId = await convex.mutation(api.auth.adminUpsertUser, { email, password, name, role });
    return NextResponse.json({ ok: true, userId });
  } catch (error: any) {
    console.error('create-user error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}


