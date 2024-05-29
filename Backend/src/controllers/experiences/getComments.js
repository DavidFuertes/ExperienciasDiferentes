import { getPool } from '../../db/poolQuery.js';

async function getComments (req, res, next) {

    const { id } = req.query;

    try {
        const pool = await getPool();
        const [allComments] = await pool.query(`
        SELECT c.content, u.name
        FROM Comments c
        INNER JOIN Users u ON c.user_id = u.id
        WHERE c.experience_id = ?;
        `,
        [id]
    );

    res.json(allComments);
    } catch (error) {
        next(error);
        
    }

}

export { getComments };