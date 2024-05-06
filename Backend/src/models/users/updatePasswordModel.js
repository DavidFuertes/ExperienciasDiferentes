// Importa el pool de conexiones.
import { getPool } from '../../db/poolQuery.js';
import bcrypt from 'bcrypt';

// Modelo para actualizar la contraseña del usuario.
const updatePasswordModel = async (userId, password) => {
    // Obtiene una instancia del pool de conexiones.
    const pool = await getPool();

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        // Ejecuta la consulta SQL para actualizar la contraseña del usuario.
        const [result] = await pool.query(
            'UPDATE Users SET password = ?, recoverPassCode = NULL WHERE id = ?',
            [hashedPass, userId],
        );

        // Verifica si se realizó la actualización correctamente.
        if (result.affectedRows === 0) {
            throw new Error(
                'No se pudo actualizar la contraseña. El usuario no existe.',
            );
        }
    } catch (error) {
        throw error;
    }
};

export default updatePasswordModel;
