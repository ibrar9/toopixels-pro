import { NextResponse } from 'next/server';
import { getData, addProject, deleteProject } from '@/lib/store';

export async function GET() {
  const data = await getData();
  return NextResponse.json(data.projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProject = await addProject({
    ...body,
    id: Date.now().toString()
  });
  return NextResponse.json(newProject);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    await deleteProject(id);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
}
