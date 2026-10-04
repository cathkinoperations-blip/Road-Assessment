// api/submit-review.js
import { Pool } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    try {
        const {
            engineer_name,
            company_name,
            email,
            phone,
            ecsa_number,
            review_date,
            general_feedback,
            question_responses,
            status
        } = req.body;

        // Validation for NOT NULL fields in schema
        if (!engineer_name || !email) {
            return res.status(400).json({ error: 'Engineer name and email are required.' });
        }

        const query = `
            INSERT INTO engineering_reviews (
                engineer_name, 
                company_name, 
                email, 
                phone, 
                ecsa_number, 
                review_date, 
                question_responses, 
                general_feedback, 
                status, 
                submitted_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, CURRENT_TIMESTAMP)
            RETURNING id;
        `;

        const values = [
            engineer_name,
            company_name || null,
            email,
            phone || null,
            ecsa_number || null,
            review_date || null,
            JSON.stringify(question_responses || {}),
            general_feedback || null,
            status || 'submitted'
        ];

        const result = await pool.query(query, values);

        return res.status(200).json({
            success: true,
            id: result.rows[0].id,
            message: status === 'draft' ? 'Draft saved successfully' : 'Review submitted successfully'
        });

    } catch (error) {
        console.error('Neon Database Execution Error:', error);
        return res.status(500).json({ 
            error: error.message || 'Database query failed' 
        });
    } finally {
        await pool.end();
    }
}