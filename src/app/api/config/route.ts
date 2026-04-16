import { NextResponse } from 'next/server';
import { getConfig, updateConfig } from '@/lib/store';

export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newConfig = await updateConfig(body);
  return NextResponse.json(newConfig);
}
