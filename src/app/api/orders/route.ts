import { NextResponse } from 'next/server';
import { addOrder, getOrders, updateOrder, deleteOrder } from '@/lib/store';

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newOrder = await addOrder({
    ...body,
    id: Date.now().toString(),
    date: new Date().toLocaleString(),
    status: 'pending'
  });
  return NextResponse.json(newOrder);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const updated = await updateOrder(body.id, { status: body.status });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    await deleteOrder(id);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
}
