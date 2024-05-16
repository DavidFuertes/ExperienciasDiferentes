import { getPool } from '../../db/poolQuery.js';
import { listExperiencesSchema } from '../../schemas/experiences/listExperiencesSchema.js';
import { notMatchingQuery } from '../../services/errorService.js';
import validateSchema from '../../utilities/validateSchema.js';

async function listExperiences(req, res, next) {
    const { search, type, sortBy, sortOrder } = req.query;
    try {
        //Validamos el body con joi
        await validateSchema(listExperiencesSchema, req.body);
        const pool = await getPool();

        let reqInfo = `
        SELECT 
            Experiences.*,
            AVG(Ratings.rating) AS average_rating,
            (SELECT COUNT(*) FROM Reservations WHERE Experiences.id = Reservations.experience_id) AS num_reservations
          FROM 
            Experiences
          LEFT JOIN 
            Ratings ON Experiences.id = Ratings.experience_id
          WHERE 
            1=1
    `;

        if (!search && !type) {
        } else {
            if (search && type) {
                reqInfo += ` AND (city LIKE '%${search}%' AND type LIKE '%${type}%')`;
            } else {
                if (search) {
                    reqInfo += ` AND city LIKE '%${search}%'`;
                }
                if (type) {
                    reqInfo += ` AND type LIKE '%${type}%'`;
                }
            }
        }

        reqInfo += ` GROUP BY Experiences.id, Experiences.creator_id, Experiences.title, Experiences.description, Experiences.type, Experiences.city, Experiences.image, Experiences.date, Experiences.price, Experiences.min_places, Experiences.total_places, Experiences.active`;

        // Aplica la ordenación si se proporcionan parámetros de orden
        if (sortBy && sortOrder) {
            reqInfo += ` ORDER BY ${sortBy} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
        }

        const [listedExperiences] = await pool.query(reqInfo);

        if (listedExperiences.length === 0) {
            notMatchingQuery();
        }

        return res.status(200).json({
            message: 'Experiencias obtenidas correctamente',
            experiences: listedExperiences,
        });
    } catch (error) {
        next(error);
    }
}

export { listExperiences };
