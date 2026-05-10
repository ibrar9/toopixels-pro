import { NextResponse } from 'next/server';
import { getConfig, updateConfig } from '@/lib/store';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newConfig = await updateConfig(body);
  
  // Update all main pages when config changes
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/portfolio');
  revalidatePath('/blog');
  revalidatePath('/api/config');
  
  return NextResponse.json(newConfig);
}
