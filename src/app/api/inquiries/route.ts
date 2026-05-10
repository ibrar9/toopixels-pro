import { NextResponse } from 'next/server';
import { getInquiries, addInquiry } from '@/lib/store';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

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
  
  revalidatePath('/admin/dashboard');
  revalidatePath('/api/inquiries');
  
  return NextResponse.json(newInquiry);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, read } = body;
  const { updateInquiry } = await import('@/lib/store');
  const updated = await updateInquiry(id, { read });
  
  revalidatePath('/admin/dashboard');
  revalidatePath('/api/inquiries');
  
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const { deleteInquiry } = await import('@/lib/store');
  if (id) {
    await deleteInquiry(id);
    revalidatePath('/admin/dashboard');
    revalidatePath('/api/inquiries');
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
}
