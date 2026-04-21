import { NextResponse } from 'next/server';
import { getInquiries, addInquiry } from '@/lib/store';

export async function GET() {
  const inquiries = await getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newInquiry = await addInquiry({
    ...body,
    id: Date.now().toString(),
    date: new Date().toLocaleString(),
    read: false
  });
  return NextResponse.json(newInquiry);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, read } = body;
  const { updateInquiry } = await import('@/lib/store');
  const updated = await updateInquiry(id, { read });
  return NextResponse.json(updated);
}
