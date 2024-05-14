import { getPool } from '../../db/poolQuery.js';
import { changeExperienceStatusSchema } from '../../schemas/experiences/changeExperienceStatusSchema.js';
import { editExperienceSchema } from '../../schemas/experiences/editExperienceSchema.js';
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
        await validateSchema(editExperienceSchema, req.body);

        const pool = await getPool();

        const [updateInfo] = await pool.query(
            `
            UPDATE Experiences
            SET title = ?, description = ?, type = ?, city = ?, image = ?, price = ?, min_places = ?, total_places = ?
            WHERE id = ?
        `,
            [
                title,
                description,
                type,
                city,
                image,
                price,
                min_places,
                total_places,
                id
            ],
        );

        if (updateInfo.affectedRows === 0) {
            throw new Error('No se encontró la experiencia con ese ID');
        }

        const [insertDate] = await pool.query(
            `
            INSERT INTO Dates (experience_id, date)
            VALUES(?, ?)
        `,
            [
                id,
                date,
            ],
        );

        const [updatedData] = await pool.query(
            `
            SELECT Experiences.*, Dates.date 
            FROM Experiences 
            LEFT JOIN Dates ON Experiences.id = Dates.experience_id
            WHERE Experiences.id = ?
            `,
            [id]
        );

        res.status(200).json({
            message: 'Experience updated successfully',
            updatedData
        });
    } catch (error) {
        next(error);
    }
}

export { editExperience };
