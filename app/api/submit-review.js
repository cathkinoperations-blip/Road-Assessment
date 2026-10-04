import { NeonHTTPPool } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            engineer_name = '',
            company_name = '',
            email = '',
            phone = '',
            ecsa_number = '',
            review_date = null,
            question_responses = {},
            general_feedback = '',
            status = 'submitted' // Accepts 'draft' or 'submitted'
        } = req.body;

        // Validation: Required fields only enforced on final submission
        if (status === 'submitted') {
            if (!engineer_name.trim() || !email.trim()) {
                return res.status(400).json({ 
                    error: 'Engineer Name and Email are required for final submission.' 
                });
            }
        }

        // Initialize Neon HTTP connection pool
        const sql = NeonHTTPPool(process.env.DATABASE_URL);

        // Insert submission record into Neon PostgreSQL
        const result = await sql`
            INSERT INTO engineering_reviews (
                engineer_name, 
                company_name, 
                email, 
                phone, 
                ecsa_number, 
                review_date, 
                question_responses, 
                general_feedback,
                status
            ) VALUES (
                ${engineer_name.trim() || null}, 
                ${company_name.trim() || null}, 
                ${email.trim() || null}, 
                ${phone.trim() || null}, 
                ${ecsa_number.trim() || null}, 
                ${review_date || null}, 
                ${JSON.stringify(question_responses)}, 
                ${general_feedback.trim() || null},
                ${status}
            )
            RETURNING id, status, submitted_at;
        `;

        const isDraft = status === 'draft';
        return res.status(200).json({
            success: true,
            message: isDraft 
                ? 'Draft review saved successfully!' 
                : 'Engineering review submitted successfully!',
            submission_id: result[0].id,
            status: result[0].status
        });

    } catch (error) {
        console.error('Database query execution error:', error);
        return res.status(500).json({ 
            error: 'Failed to process database entry. Please try again.' 
        });
    }
}