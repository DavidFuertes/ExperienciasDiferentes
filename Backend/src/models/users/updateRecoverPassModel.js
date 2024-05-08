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

    // Creamos el asunto del email de recuperación de contraseña.
    const emailSubject =
        'Recuperación de contraseña en Experiencias Diferentes:)';

    // Creamos el contenido del email
    const emailBody = `
            Has solicitado la recuperación de contraseña para este email en Experiencias Diferentes. 
                
            Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}
            
            Reiniciala <a href="${RECOVERPASS_URL}">aquí</a>  

            Si no has sido tú ignora este email.
        `;

    // Enviamos el email de verificación al usuario.
    await sendMail(email, emailSubject, emailBody);
};

export default updateRecoverPassModel;
