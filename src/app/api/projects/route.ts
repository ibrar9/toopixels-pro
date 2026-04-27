import { NextResponse } from 'next/server';
import { getData, addProject, deleteProject } from '@/lib/store';

const NO_CACHE = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
};

export async function GET() {
  const data = await getData();
  return NextResponse.json(data.projects, { headers: NO_CACHE });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProject = await addProject({
    ...body,
    id: Date.now().toString()
  });
  return NextResponse.json(newProject, { headers: NO_CACHE });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    await deleteProject(id);
    return NextResponse.json({ success: true }, { headers: NO_CACHE });
  }
  return NextResponse.json({ error: 'Missing ID' }, { status: 400, headers: NO_CACHE });
}
