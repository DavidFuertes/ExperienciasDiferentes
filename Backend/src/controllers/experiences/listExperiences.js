import { getPool } from '../../db/poolQuery.js';
import { listExperiencesSchema } from '../../schemas/experiences/listExperiencesSchema.js';
import validateSchema from '../../utilities/validateSchema.js';

async function listExperiences(req, res, next) {
    const { title, city, isActive, isConfirmed, sortBy, sortOrder } = req.body;

    try {
        //Validamos el body con joi
        await validateSchema(listExperiencesSchema, req.body);
        const pool = await getPool();

        let reqInfo = `
        SELECT Experiences.*, AVG(Ratings.rating) AS average_rating
        FROM Experiences
        LEFT JOIN Ratings ON Experiences.id = Ratings.experience_id
        WHERE 1=1
    `;

        if (title) {
            reqInfo += ` AND title LIKE '%${title}%'`;
        }
        if (city) {
            reqInfo += ` AND city LIKE '%${city}%'`;
        }
        if (isActive !== undefined) {
            reqInfo += ` AND active = ${isActive}`;
        }
        if (isConfirmed !== undefined) {
            reqInfo += ` AND isConfirmed = ${isConfirmed === 'true' ? 1 : 0}`;
        }

        // Aplica la ordenación si se proporcionan parámetros de orden
        if (sortBy && sortOrder) {
            reqInfo += ` ORDER BY ${sortBy} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
        }

        reqInfo += ` GROUP BY Experiences.id, Experiences.creator_id, Experiences.title, Experiences.description, Experiences.type, Experiences.city, Experiences.image, Experiences.date, Experiences.price, Experiences.min_places, Experiences.total_places, Experiences.active`;

        const [listedExperiences] = await pool.query(reqInfo);

        res.json(listedExperiences);
    } catch (error) {
        next(error);
    }
}

export { listExperiences };
