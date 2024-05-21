import { getPool } from '../../db/poolQuery.js';
import { changeExperienceStatusSchema } from '../../schemas/experiences/changeExperienceStatusSchema.js';
import { notAuthUser, notFoundError } from '../../services/errorService.js'; // Importa notFoundError desde errorService.js
import validateSchema from '../../utilities/validateSchema.js';

async function changeExperienceStatus(req, res, next) {
    const { is_active } = req.body;
    const { id } = req.query;

    try {
        // Validamos el body con Joi
        await validateSchema(changeExperienceStatusSchema, req.body);

        // Obtenemos el id del usuario que creó el post
        const pool = await getPool();
        const [experience] = await pool.query(
            `
            SELECT creator_id
            FROM Experiences
            WHERE id = ?
            `,
            [id],
        );

        // Verificamos si la experiencia existe
        if (experience.length === 0) {
            notFoundError('Experience'); // Utiliza notFoundError para manejar el error de experiencia no encontrada
        }

        const creatorId = experience[0].creator_id;

        // Verificar si el usuario es un administrador o el autor del post a través de la información que obtenemos del token
        if (req.user.role !== 'admin' && creatorId !== req.user.id) {
            notAuthUser(); // Manejar el error de usuario no autorizado
        }

        // Actualizamos la experiencia
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
