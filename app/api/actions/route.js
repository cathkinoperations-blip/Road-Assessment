import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { id, status, photo_url } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Action ID is required' }, { status: 400 });
    }

    if (photo_url) {
      await sql`
        UPDATE action_items 
        SET status = ${status}, photo_url = ${photo_url} 
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE action_items 
        SET status = ${status} 
        WHERE id = ${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update action item:', error);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }
}
