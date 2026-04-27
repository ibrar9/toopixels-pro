import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { filename: string } }) {
  const filename = params.filename;
  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  // Define the upload directory outside of public to prevent Next.js static asset conflicts
  const uploadDir = path.join(process.cwd(), 'data-uploads');
  const filepath = path.join(uploadDir, filename);

  if (!fs.existsSync(filepath)) {
    // Fallback: check public/uploads in case it's an older image
    const oldPath = path.join(process.cwd(), 'public', 'uploads', filename);
    if (fs.existsSync(oldPath)) {
      const buffer = fs.readFileSync(oldPath);
      const ext = path.extname(filename).toLowerCase();
      let mimeType = 'image/jpeg';
      if (ext === '.png') mimeType = 'image/png';
      else if (ext === '.gif') mimeType = 'image/gif';
      else if (ext === '.webp') mimeType = 'image/webp';
      else if (ext === '.svg') mimeType = 'image/svg+xml';

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const buffer = fs.readFileSync(filepath);
  
  // Determine Content-Type based on extension
  const ext = path.extname(filename).toLowerCase();
  let mimeType = 'image/jpeg';
  if (ext === '.png') mimeType = 'image/png';
  else if (ext === '.gif') mimeType = 'image/gif';
  else if (ext === '.webp') mimeType = 'image/webp';
  else if (ext === '.svg') mimeType = 'image/svg+xml';

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
