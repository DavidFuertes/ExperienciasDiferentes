// Importamos la función que devuelve una conexión con la base de datos.
import { getPool } from '../../db/poolQuery.js';

// Importamos los servicios.
import { sendMail } from '../../utilities/sendMail.js';

const { RECOVERPASS_URL } = process.env;

// Función que realiza una consulta a la base de datos para actualizar la contraseña de un usuario.
const updateRecoverPassModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    // Actualizamos el código de recuperación de contraseña del usuario.
    await pool.query(`UPDATE Users SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);
};

export default updateRecoverPassModel;
