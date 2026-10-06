import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const locations = await sql`SELECT * FROM inspection_locations ORDER BY id ASC;`;
            const actionItems = await sql`SELECT * FROM action_items ORDER BY id ASC;`;
            const updates = await sql`SELECT * FROM location_updates ORDER BY update_date DESC;`;

            const combined = locations.map(loc => ({
                ...loc,
                action_items: actionItems.filter(item => item.location_id === loc.id),
                updates: updates.filter(u => u.location_id === loc.id)
            }));

            return res.status(200).json(combined);
        }

        if (req.method === 'POST') {
            const { location_id, update_date, notes, attachment_url } = req.body;
            
            if (!location_id || !update_date || !notes) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const result = await sql`
                INSERT INTO location_updates (location_id, update_date, notes, attachment_url)
                VALUES (${location_id}, ${update_date}, ${notes}, ${attachment_url || null})
                RETURNING *;
            `;

            return res.status(201).json(result[0]);
        }

        if (req.method === 'PUT') {
            const { id, update_date, notes, attachment_url } = req.body;
            
            if (!id || !update_date || !notes) {
                return res.status(400).json({ error: 'Missing required fields for update' });
            }

            const result = await sql`
                UPDATE location_updates 
                SET update_date = ${update_date}, 
                    notes = ${notes}, 
                    attachment_url = COALESCE(${attachment_UrlNull(attachment_url)}, attachment_url)
                WHERE id = ${id}
                RETURNING *;
            `;

            return res.status(200).json(result[0]);
        }

        if (req.method === 'DELETE') {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'Missing update id for deletion' });
            }

            await sql`DELETE FROM location_updates WHERE id = ${id};`;
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

function attachment_UrlNull(val) {
    return val === undefined ? null : val;
}
