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
        console.log('Ha llegao');
        // Si se proporciona un avatar, moverlo a la carpeta uploads
        console.log('Avatar proporcionado:', avatar);
        const avatarFileName = `avatar_${userId}_${Date.now()}${path.extname(avatar)}`;
        const avatarPath = path.join(uploadsDir, avatarFileName);
        try {
            await fs.copyFile(avatar.path, avatarPath); // Copiar la imagen al directorio de uploads
            console.log('Avatar copiado exitosamente a:', avatarPath);
            query += ', avatar = ?';
            values.push(avatarFileName); // Guardar el nombre del archivo en la base de datos
        } catch (error) {
            console.error('Error al mover el avatar:', error);
            throw error; // Lanzar el error para que se maneje en la capa superior
        }
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
