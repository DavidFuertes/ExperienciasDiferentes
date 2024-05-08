import { getPool } from '../../db/poolQuery.js';
import { experienceReservationSchema } from '../../schemas/experiences/experienceReservationSchema.js';
import validateSchema from '../../utilities/validateSchema.js';
import { alreadyReserved, notReserved } from '../../services/errorService.js';

async function experienceReservation(req, res, next) {
    const newReservation = req.body;
    const { experience_id, cancelation } = newReservation;
    const { id } = req.user;

    try {
        // Validamos el body con Joi
        await validateSchema(experienceReservationSchema, req.body);
        const pool = await getPool();

        if (cancelation) {
            // Si es una solicitud de cancelación, intenta cancelar la reserva
            const hasReserved = await checkIfUserAlreadyReserved(
                pool,
                id,
                experience_id,
            );
            if (!hasReserved) {
                notReserved();
            }

            const cancelResult = await cancelReservation(
                pool,
                id,
                experience_id,
            );
            // Si se canceló la reserva, envía un mensaje de éxito
            return res.status(200).send({
                message: 'Reserva cancelada correctamente',
            });
        } else {
            // Si no es una solicitud de cancelación, verifica si ya ha reservado esta experiencia el usuario
            const hasReserved = await checkIfUserAlreadyReserved(
                pool,
                id,
                experience_id,
            );
            if (hasReserved) {
                // Si ya ha reservado esta experiencia, envía un mensaje de error
                alreadyReserved();
            }

            // Si no ha reservado esta experiencia, realiza la reserva
            const insertResult = await insertReservation(
                pool,
                id,
                experience_id,
            );
            return res.status(201).send({
                message: 'Reserva realizada correctamente',
                newId: insertResult.insertId,
            });
        }
    } catch (error) {
        next(error);
    }
}

async function checkIfUserAlreadyReserved(pool, id, experience_id) {
    const [existingReserve] = await pool.query(
        `
        SELECT id FROM Reservations
        WHERE user_id = ? AND experience_id = ?
        `,
        [id, experience_id],
    );
    return existingReserve.length > 0;
}

async function insertReservation(pool, id, experience_id) {
    const [insertResult] = await pool.query(
        `
        INSERT INTO Reservations (user_id, experience_id)
        VALUES (?, ?)
        `,
        [id, experience_id],
    );
    return insertResult;
}

async function cancelReservation(pool, id, experience_id) {
    const cancelResult = await pool.query(
        `
        DELETE FROM Reservations
        WHERE user_id = ? AND experience_id = ?
        `,
        [id, experience_id],
    );
    return cancelResult;
}

export { experienceReservation };
