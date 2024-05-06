// Importamos la función que devuelve una conexión con la base de datos.
import { getPool } from '../../db/poolQuery.js';

const selectUserByRecoverCodeModel = async (recoverPassCode) => {
    const pool = await getPool();
    try {
        const [users] = await pool.query(
            `SELECT * FROM Users WHERE recoverPassCode = ?`,
            [recoverPassCode],
        );
        return users[0]; // Devolvemos el primer usuario encontrado, si existe
    } catch (error) {
        console.error(
            'Error al buscar usuario por código de recuperación:',
            error,
        );
        throw error; // Reenviamos el error para manejarlo en la capa superior
    }
};

export default selectUserByRecoverCodeModel;
