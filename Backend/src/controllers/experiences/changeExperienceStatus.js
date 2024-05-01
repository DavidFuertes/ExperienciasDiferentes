import { getPool } from '../../db/poolQuery.js';
import { changeExperienceStatusSchema } from '../../schemas/experiences/changeExperienceStatusSchema.js';
import { notAuthUser } from '../../services/errorService.js';
import validateSchema from '../../utilities/validateSchema.js';

async function changeExperienceStatus(req, res, next) {
    const { is_active } = req.body;
    const { id } = req.query;

    try {
        //Validamos el body con joi
        await validateSchema(changeExperienceStatusSchema, req.body);

        //Obtenemos el id del usuario que creó el post
        const pool = await getPool();
        const [experience] = await pool.query(
            `
            SELECT creator_id
            FROM Experiences
            WHERE id = ?
        `,
            [id],
        );
        const creatorId = experience[0].creator_id;

        // Verificar si el usuario es un administrador o el autor del post a través de la información que obtenemos del token
        if (req.user.role !== 'admin' && creatorId !== req.user.id) {
            notAuthUser();
        }

        await pool.query(
            `
            UPDATE Experiences
            SET active = ?
            WHERE id = ?;
        `,
            [is_active, id],
        );

        res.status(200).send({ message: 'OK' });
    } catch (error) {
        next(error);
    }
}

export { changeExperienceStatus };
