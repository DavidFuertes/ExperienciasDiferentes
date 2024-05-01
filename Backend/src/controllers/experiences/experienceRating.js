import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';

async function experienceRating(req, res, next) {
    const rateExperience = req.body;
    const { user_id, experience_id, rating } = rateExperience;
    const { role } = req.user;

    try {
        const pool = await getPool();

        const [insertInfo] = await pool.query(
            `
            INSERT INTO Ratings (user_id, experience_id, rating)
            VALUES(?, ?, ?)
        `,
            [user_id, experience_id, rating],
        );

        res.status(201).send({
            message: 'Experiencia valorada con éxito.',
            newId: insertInfo.insertId,
        });
    } catch (error) {
        next(error);
    }
}

export { experienceRating };
