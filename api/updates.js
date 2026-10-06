import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    // Enable CORS for Vercel deployment
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            // Fetch all locations along with their chronological updates
            const locations = await sql`SELECT * FROM inspection_locations ORDER BY id ASC;`;
            const updates = await sql`SELECT * FROM location_updates ORDER BY update_date DESC;`;

            const combined = locations.map(loc => ({
                ...loc,
                updates: updates.filter(u => u.location_id === loc.id)
            }));

            return res.status(200).json(combined);
        }

        if (req.method === 'POST') {
            // Add a new date-stamped update to a location
            const { location_id, update_date, notes, attachment_url } = req.body;
            
            if (!location_id || !update_date || !notes) {
                return res.status(400).json({ error: 'Missing required fields (location_id, update_date, notes)' });
            }

            const result = await sql`
                INSERT INTO location_updates (location_id, update_date, notes, attachment_url)
                VALUES (${location_id}, ${update_date}, ${notes}, ${attachment_url || null})
                RETURNING *;
            `;

            return res.status(201).json(result[0]);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

