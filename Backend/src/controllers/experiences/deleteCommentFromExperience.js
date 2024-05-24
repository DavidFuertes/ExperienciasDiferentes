import { getPool } from '../../db/poolQuery.js';
import { deleteCommentSchema } from '../../schemas/experiences/deleteCommentSchema.js';
import { deleteCommentFailed } from '../../services/errorService.js';
import validateSchema from '../../utilities/validateSchema.js';

export const deleteCommentFromExperience = async (req, res, next) => {
    const { commentId } = req.query;

    try {
        await validateSchema(deleteCommentSchema, req.query);

        const pool = await getPool();

        const [deleteInfo] = await pool.query(
            `DELETE FROM Comments WHERE id = ?`,
            [commentId],
        );

        if (deleteInfo.affectedRows === 0) {
            deleteCommentFailed();
        }

        res.status(200).send({
            message: 'Comentario eliminado',
            deleteInfo,
        });
    } catch (error) {
        next(error);
    }
};
