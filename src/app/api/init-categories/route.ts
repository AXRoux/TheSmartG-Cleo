import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // This endpoint can be called to initialize categories if needed
    // In a real app, you'd call the Convex mutation here
    return NextResponse.json({ 
      success: true, 
      message: 'Categories initialization endpoint ready' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to initialize categories' 
    }, { status: 500 });
  }
}
