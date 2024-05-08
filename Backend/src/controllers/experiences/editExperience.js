import { getPool } from '../../db/poolQuery.js';
import { changeExperienceStatusSchema } from '../../schemas/experiences/changeExperienceStatusSchema.js';
import { notAuthUser } from '../../services/errorService.js';
import validateSchema from '../../utilities/validateSchema.js';

async function editExperience(req, res, next) {

    const { id } = req.query;
    const newExperience = req.body;
    const {
        title,
        description,
        type,
        city,
        image,
        date,
        price,
        min_places,
        total_places,
        is_active,
    } = newExperience;

    try {
        const pool = await getPool();

        await pool.query(
            `
            UPDATE Experiences
            SET 
            title = ?,
            description = ?,
            type = ?,
            city = ?,
            image = ?,
            date = ?,
            price = ?,
            min_places = ?,
            total_places = ?,
            active = ?
            WHERE
            id = ?;
        `,
            [title, description, type, city, image, date, price, min_places, total_places, is_active, id ],
        );

        res.status(200).send({ message: 'OK' });
    } catch (error) {
        next(error);
    }
}

export { editExperience };