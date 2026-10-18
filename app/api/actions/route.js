import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { id, status, photo_url, notes, remove_photo } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Action ID is required' }, { status: 400 });
    }

    if (remove_photo) {
      // Clear out the after photo while updating status and notes
      await sql`
        UPDATE action_items 
        SET status = ${status}, after_photo_url = NULL, notes = ${notes} 
        WHERE id = ${id}
      `;
    } else if (photo_url) {
      // Save new upload into after_photo_url
      await sql`
        UPDATE action_items 
        SET status = ${status}, after_photo_url = ${photo_url}, notes = ${notes} 
        WHERE id = ${id}
      `;
    } else {
      // Update status and notes without changing existing photo
      await sql`
        UPDATE action_items 
        SET status = ${status}, notes = ${notes} 
        WHERE id = ${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update action item:', error);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }
}