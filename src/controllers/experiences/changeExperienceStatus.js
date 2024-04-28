import { getPool } from '../../db/poolQuery.js';
import { notAuthUser } from '../../services/errorService.js';

async function changeExperienceStatus(req, res, next) {
    const { is_active } = req.body;
    const { id } = req.query;
    const role = req.user;

    try {
        // Todo: Habría que validar que sea admin o el autor del post (post.userid == user.id)
        if (role !== 'admin') {
            notAuthUser();
        }

        const pool = await getPool();
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
