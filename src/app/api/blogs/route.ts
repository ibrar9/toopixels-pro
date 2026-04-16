import { NextResponse } from 'next/server';
import { getData, addBlog } from '@/lib/store';

export async function GET() {
  const data = await getData();
  return NextResponse.json(data.blogs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newBlog = await addBlog({
    ...body,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    published: true
  });
  return NextResponse.json(newBlog);
}
