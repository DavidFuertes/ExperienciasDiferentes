// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que devuelve una conexión con la base de datos.
import { getPool } from '../../db/poolQuery.js';

// Importamos los errores.
import {
    userAlreadyRegisteredError,
    emailAlreadyRegisteredError,
} from '../../services/errorService.js';
import 'dotenv/config.js';
const { DEFAULT_AVATAR_URL } = process.env;

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertUserModel = async (
    username,
    email,
    password,
    registrationCode,
) => {
    const pool = await getPool();

    // Buscamos en la base de datos algún usuario con ese nombre.
    let [users] = await pool.query(`SELECT id FROM Users WHERE name = ?`, [
        username,
    ]);

    // Si existe algún usuario con ese nombre lanzamos un error.
    if (users.length > 0) {
        userAlreadyRegisteredError();
    }

    // Buscamos en la base de datos algún usuario con ese email.
    [users] = await pool.query(`SELECT id FROM Users WHERE email = ?`, [email]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0) {
        emailAlreadyRegisteredError();
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await pool.query(
        `INSERT INTO Users (name, email, password, avatar, registrationCode) VALUES (?, ?, ?, ?, ?)`,
        [username, email, hashedPass, DEFAULT_AVATAR_URL, registrationCode],
    );
};
