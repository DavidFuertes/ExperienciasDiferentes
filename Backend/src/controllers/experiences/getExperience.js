import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import { experienceNotExistError } from '../../services/errorService.js';

async function getExperience(req, res, next) {
    const { id } = req.query;

    try {
        if (!id) {
            experienceNotExistError();
        }

        const pool = await getPool();

        const [data] = await pool.query(
            `
        SELECT title, description, city, image, date, price, min_places, total_places FROM Experiences WHERE id = ?
        `,
            [id],
        );

        const [rate] = await pool.query(
            `
        SELECT AVG(rate) AS average_rate
        FROM Comments
        WHERE experience_id = ?
        `,
            [id],
        );

        const [inscribed] = await pool.query(
            `
            SELECT name, email, avatar FROM Users   
            INNER JOIN Reservations ON Users.id = Reservations.user_id WHERE Reservations.experience_id = ?
        `,
            [id],
        );

        const [comments] = await pool.query(
            `
            SELECT content From Comments WHERE experience_id = ?
        `,
            [id],
        );

        const fullExperience = {
            data,
            comments,
            rate,
            inscribed,
        };

        res.json(fullExperience);
    } catch (error) {
        next(error);
    }
}

export { getExperience };
