import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import { userNotExistError } from '../../services/errorService.js';

async function userInscribed(req, res, next) {
    const { id } = req.user;

    try {
        if (!id) {
            userNotExistError();
            // Desconozco si el error es correcto.
        }

        const pool = await getPool();

        const [InscribedIn] = await pool.query(
            `SELECT * FROM Experiences
            JOIN Reservations ON Experiences.id = Reservations.experience_id WHERE Reservations.user_id = ?`,
            [id],
        );

        res.json(InscribedIn);
    } catch (error) {
        next(error);
    }
}

export { userInscribed };
