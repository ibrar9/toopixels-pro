import { NextResponse } from 'next/server';
import { getData, addProject } from '@/lib/store';

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
