import { getPool } from '../../db/poolQuery.js';

async function updateExperience(req, res, next) {
    const experienceUpdate = req.body;
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
    } = experienceUpdate;
    const { id } = req.query;  
    const role = req.user;

    try {
        if (role !== 'admin') {
            throw new Error('No eres admin');
            return;
        }
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

export { updateExperience };
