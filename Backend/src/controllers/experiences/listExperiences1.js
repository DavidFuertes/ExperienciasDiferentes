import { getPool } from '../../db/poolQuery.js';
import { listExperiencesSchema } from '../../schemas/experiences/listExperiencesSchema.js';
import validateSchema from '../../utilities/validateSchema.js';

async function listExperiences1(req, res, next) {

    try {
        const pool = await getPool();
        const [listedExperiences] = await pool.query(
            `
                SELECT Experiences.*, AVG(Ratings.rating) AS average_rating, GROUP_CONCAT(Dates.date) AS date
                FROM Experiences
                LEFT JOIN Ratings ON Experiences.id = Ratings.experience_id
                LEFT JOIN Dates ON Experiences.id = Dates.experience_id
                WHERE 1=1
                GROUP BY Experiences.id;
    
            `
        );
    
        res.status(200).json({
            message: 'Experience updated successfully',
            listedExperiences
        });
        
    } catch (error) {
        next(error)
    }



}

export { listExperiences1 };