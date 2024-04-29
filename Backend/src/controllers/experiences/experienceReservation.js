import { getPool } from '../../db/poolQuery.js';

async function experienceReservation(req, res, next) {
    const newReservation = req.body;
    const { user_id, experience_id, cancelation } = newReservation;

    try {
        const pool = await getPool();

        if (!cancelation) {
            const [insertInfo] = await pool.query(
                `
            INSERT INTO Reservations (user_id, experience_id)
            VALUES(?, ?)
        `,
                [user_id, experience_id],
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
                [user_id, experience_id],
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
