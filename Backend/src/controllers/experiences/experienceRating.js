import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import validateSchema from '../../utilities/validateSchema.js';
import { experienceRatingSchema } from '../../schemas/experiences/experienceRatingSchema.js';

async function experienceRating(req, res, next) {
    const rateExperience = req.body;
    const { experience_id, rating } = rateExperience;
    const { id } = req.user;

    try {
        //Validamos el body con joi
        await validateSchema(experienceRatingSchema, req.body);

        const pool = await getPool();

        const [insertInfo] = await pool.query(
            `
            INSERT INTO Ratings (user_id, experience_id, rating)
            VALUES(?, ?, ?)
        `,
            [id, experience_id, rating],
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
