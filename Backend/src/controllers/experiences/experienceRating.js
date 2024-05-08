import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import validateSchema from '../../utilities/validateSchema.js';
import { experienceRatingSchema } from '../../schemas/experiences/experienceRatingSchema.js';
import { alreadyVoted } from '../../services/errorService.js';

async function experienceRating(req, res, next) {
    const rateExperience = req.body;
    const { experience_id, rating } = rateExperience;
    const { id } = req.user;
    console.log(id);

    try {
        //Validamos el body con joi
        await validateSchema(experienceRatingSchema, req.body);

        const pool = await getPool();

        //Verificamos si ya ha votado el usuario

        const hasVoted = await checkIfUserAlreadyVoted(pool, id, experience_id);
        if (hasVoted) {
            alreadyVoted();
        }

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

async function checkIfUserAlreadyVoted(pool, id, experience_id) {
    const [existingVote] = await pool.query(
        `
        SELECT id FROM Ratings
        Where user_id = ? AND experience_id = ?
        `,
        [id, experience_id],
    );

    return existingVote.length > 0;
}

export { experienceRating };
