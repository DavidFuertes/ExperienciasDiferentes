import bcrypt from 'bcrypt';
import { getPool } from '../../db/poolQuery.js';
import 'dotenv/config.js';

const { DEFAULT_AVATAR_URL } = process.env;

export const insertUserModel = async (email, registrationCode) => {
    const pool = await getPool();

    try {
        // Buscamos en la base de datos algún usuario con ese email.
        let [users] = await pool.query(`SELECT id FROM Users WHERE email = ?`, [
            email,
        ]);

        // Si no existe ningún usuario con ese email, lanzamos un error.
        // if (users.length === 0) {
        //     throw new Error(
        //         'No se encontró ningún usuario con ese correo electrónico',
        //     );
        // }

        // Insertamos el código de reactivación.
        await pool.query(
            `UPDATE Users SET registrationCode = ? WHERE email = ?`,
            [registrationCode, email],
        );
    } catch (error) {
        throw new Error(error.message);
    }
};
