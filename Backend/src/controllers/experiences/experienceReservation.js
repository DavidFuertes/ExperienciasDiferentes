import { getPool } from '../../db/poolQuery.js';
import { experienceReservationSchema } from '../../schemas/experiences/experienceReservationSchema.js';
import validateSchema from '../../utilities/validateSchema.js';

async function experienceReservation(req, res, next) {
    const newReservation = req.body;
    const { experience_id, cancelation } = newReservation;
    const { id } = req.user;

    try {
        //Validamos el boy con joi
        await validateSchema(experienceReservationSchema, req.body);
        const pool = await getPool();

        if (!cancelation) {
            const [insertInfo] = await pool.query(
                `
            INSERT INTO Reservations (user_id, experience_id)
            VALUES(?, ?)
        `,
                [id, experience_id],
            );

            console.log(insertInfo);

            res.status(201).send({
                message: 'RESERVA REALIZADA CORRECTAMENTE',
                newId: insertInfo.insertId,
            });
        } else {
            const [insertInfo] = await pool.query(
                `
            DELETE FROM Reservations
            WHERE user_id = '?' AND experience_id = '?';

        `,
                [id, experience_id],
            );

            console.log(insertInfo);

            res.status(201).send({
                message: 'RESERVA CANCELADA CORRECTAMENTE',
                newId: insertInfo.insertId,
            });
        }
    } catch (error) {
        next(error);
    }
}

export { experienceReservation };