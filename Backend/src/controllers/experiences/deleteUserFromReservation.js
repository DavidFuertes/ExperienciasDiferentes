import { getPool } from '../../db/poolQuery.js';
import { deleteUserFromReservationSchema } from '../../schemas/experiences/deleteUserFromReservationSchema.js';
import { deleteUserFromReservationFailed } from '../../services/errorService.js';
import validateSchema from '../../utilities/validateSchema.js';

export const deleteUserFromReservation = async (req, res, next) => {
    const { reservation_id } = req.query;

    try {
        await validateSchema(deleteUserFromReservationSchema, req.query);

        const pool = await getPool();

        const [deleteInfo] = await pool.query(
            `DELETE FROM Reservations WHERE id = ?`,
            [reservation_id],
        );

        if (deleteInfo.affectedRows === 0) {
            deleteUserFromReservationFailed();
        }

        return res.status(200).send({
            message: 'Reserva del usuario eliminada',
            deleteInfo,
        });
    } catch (error) {
        next(error);
    }
};
