import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import { experienceNotExistError } from '../../services/errorService.js';

async function getMyExperiences(req, res, next) {
    const user_id = req.user.id;
    console.log(user_id);

    try {
        const pool = await getPool();

        const [data] = await pool.query(
            `
            SELECT 
            e.id, 
            e.title, 
            e.description, 
            e.type, 
            e.city, 
            e.image, 
            DATE_FORMAT(e.date, '%Y-%m-%d') AS formatted_date,
            e.price, 
            AVG(coalesce(c.rate, 0)) AS average_rate,
            JSON_ARRAYAGG(JSON_OBJECT('user_id', c.user_id, 'username', u.name, 'content', c.content)) AS comments,
            e.active AS status
        FROM 
            Experiences e
        JOIN 
            Reservations r ON e.id = r.experience_id
        LEFT JOIN 
            Comments c ON e.id = c.experience_id
        LEFT JOIN 
            Users u ON c.user_id = u.id
        WHERE 
            r.user_id = ? -- Aquí deberías colocar el user_id deseado
        GROUP BY 
            e.id, 
            e.title, 
            e.description, 
            e.type, 
            e.city, 
            e.image, 
            e.date, 
            e.price, 
            e.active
        ORDER BY 
            e.active DESC;
        
        `,
            [user_id],
        );

        res.json(data);
    } catch (error) {
        next(error);
    }
}

export { getMyExperiences };
