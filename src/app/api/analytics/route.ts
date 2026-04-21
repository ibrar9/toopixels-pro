import { NextResponse } from 'next/server';
import { addVisit, getAnalytics } from '@/lib/store';

export async function GET() {
  const data = await getAnalytics();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
    
    let city = "Unknown";
    let country = "Unknown";

    // Skip IP lookup for local development to avoid rate limits
    if (ip !== '127.0.0.1' && ip !== '::1') {
        try {
            const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`);
            const geoData = await geoRes.json();
            if (geoData.status === 'success') {
                city = geoData.city;
                country = geoData.country;
            }
        } catch (e) {
            console.error("Geo lookup failed", e);
        }
    }

    const visit = {
      date: new Date().toISOString(),
      city,
      country
    };

    await addVisit(visit);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
