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
            SET title = ?, description = ?, type = ?, city = ?, image = ?, date = ?, price = ?, min_places = ?, total_places = ?
            WHERE id = ?
        `,
            [
                title,
                description,
                type,
                city,
                image,
                date,
                price,
                min_places,
                total_places,
                id
            ],
        );

        if (updateInfo.affectedRows === 0) {
            throw new Error('No se encontró la experiencia con ese ID');
        }

        const [updatedData] = await pool.query(
            `
            SELECT * FROM Experiences WHERE id = ?
        `,
            [id],
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
