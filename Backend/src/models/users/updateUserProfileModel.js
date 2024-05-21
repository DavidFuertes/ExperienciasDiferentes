import { getPool } from '../../db/poolQuery.js';
import { failedUserUpdate } from '../../services/errorService.js';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

export const updateUserProfileModel = async (
    userId,
    name,
    email,
    date,
    avatar,
    residence,
    languages,
    newPassword,
) => {
    console.log('Entrando en updateUserProfileModel', email);

    const pool = await getPool();
    const uploadsDir = process.env.UPLOADS_DIR; // Obtener la ruta de uploads del archivo .env

    let query = 'UPDATE Users SET name = ?, email = ?';
    let values = [name, email];

    if (date) {
        query += ', date = ?';
        values.push(date);
    }

    if (avatar) {
        query += ', avatar = ?';
        values.push(avatar); // Guardar el nombre del archivo en la base de datos
    }

    if (residence) {
        query += ', residence = ?';
        values.push(residence);
    }

    if (languages) {
        query += ', languages = ?';
        values.push(languages);
    }

    if (newPassword) {
        query += ', password = ?';
        values.push(newPassword);
    }

    query += ' WHERE id = ?';
    values.push(userId);

    console.log('Query SQL:', query);
    console.log('Valores:', values);

    const [update] = await pool.query(query, values);

    if (update.affectedRows === 0) {
        failedUserUpdate();
    }

    console.log('Actualización completada:', update);
    return update;
};
