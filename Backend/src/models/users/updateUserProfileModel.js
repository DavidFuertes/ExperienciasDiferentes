import { getPool } from '../../db/poolQuery.js';
import { failedUserUpdate } from '../../services/errorService.js';

export const updateUserProfileModel = async (
    userId,
    name,
    email,
    date,
    avatar,
    residence,
    languages,
) => {
    console.log(avatar);
    console.log(email);
    const pool = await getPool();

    let query = 'UPDATE Users SET name = ?, email = ?'; // Inicio de la consulta SQL

    let values = [name, email]; // Valores a ser actualizados

    if (date) {
        // Si se proporciona una fecha
        query += ', date = ?'; // Agregar la columna de fecha a la consulta
        values.push(date); // Agregar el valor de la fecha a los valores
    }

    if (avatar) {
        // Si se proporciona un nuevo avatar, actualiza la columna de avatar
        query += ', avatar = ?';
        values.push(avatar);
    }

    if (residence) {
        // Si se proporciona una fecha
        query += ', residence = ?'; // Agregar la columna de fecha a la consulta
        values.push(residence); // Agregar el valor de la fecha a los valores
    }

    if (languages) {
        // Si se proporciona una fecha
        query += ', languages = ?'; // Agregar la columna de fecha a la consulta
        values.push(languages); // Agregar el valor de la fecha a los valores
    }

    query += ' WHERE id = ?'; // Condición para la actualización del usuario

    const [update] = await pool.query(query, [...values, userId]); // Ejecutar la consulta con los valores proporcionados

    if (update.affectRows === 0) {
        // Si no se afectaron filas, indicar un fallo
        failedUserUpdate();
    }

    return update; // Devolver el resultado de la actualización
};
