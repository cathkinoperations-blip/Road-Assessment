import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Load saved configuration
export async function GET() {
    try {
        const result = await sql`SELECT config_data FROM infrastructure_configs WHERE config_name = 'default_estate_spec'`;
        if (result.rows.length === 0) {
            return NextResponse.json({ success: true, data: null });
        }
        return NextResponse.json({ success: true, data: result.rows[0].config_data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// Save configuration edits
export async function POST(request) {
    try {
        const body = await request.json();
        
        await sql`
            INSERT INTO infrastructure_configs (config_name, config_data, updated_at)
            VALUES ('default_estate_spec', ${JSON.stringify(body)}, CURRENT_TIMESTAMP)
            ON CONFLICT (config_name) 
            DO UPDATE SET config_data = ${JSON.stringify(body)}, updated_at = CURRENT_TIMESTAMP;
        `;

        return NextResponse.json({ success: true, message: 'Configuration saved successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}