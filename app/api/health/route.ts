import { NextResponse } from 'next/server';

// Simple health check endpoint for Render
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}

