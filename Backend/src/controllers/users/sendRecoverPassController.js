// Importamos la dependencia que genera cadenas aleatorias de caracteres
import randomstring from 'randomstring';

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import updateRecoverPassModel from '../../models/users/updateRecoverPassModel.js';

// Importamos los servicios.
import { sendMail } from '../../utilities/sendMail.js';

const { RECOVERPASS_URL } = process.env;

//Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import emailUserSchema from '../../schemas/users/emailUserSchema.js';

// Importamos los errores.
import { userNotExistError } from '../../services/errorService.js';

// Función controladora final para que el usuario recupere la contraseña.
const sendRecoverPassController = async (req, res, next) => {
    try {
        // Obtenemos el email de la persona que quiere recuperar su contraseña.
        const { email } = req.body;

        // Pendiente validación con Joi.
        await validateSchema(emailUserSchema, req.body);

        // Comprobamos si existe algún usuario con el email proporcionado.
        const user = await selectUserByEmailModel(email);

        // Si no existe un usuario con ese email lanzamos un error.
        console.log(user);
        if (!user) {
            userNotExistError();
        }

        // Generamos el código de recuperación de contraseña.
        const recoverPassCode = randomstring.generate(10);

        // Insertamos el código de recuperación de contraseña.
        await updateRecoverPassModel(email, recoverPassCode);

        // Creamos el asunto del email de recuperación de contraseña.
        const emailSubject =
            'Recuperación de contraseña en Experiencias Diferentes:)';

        // Creamos el contenido del email
        const emailBody = `
     <body style="font-family: Arial, sans-serif; text-align: center; background-color: #333; padding: 20px;">
      <img src="https://i.postimg.cc/9F62RMj7/XP.png" alt="Icono de XP EXPERIENCIAS DIFERENTES" style="width: 150px; height: 150px;">
        <br>

            <p style="font-size: 18px; color: #FFD700; display: inline-block;">Has solicitado la recuperación de contraseña para este email en Experiencias Diferentes.</p>
            <br>  
            <p style="font-size: 16px; color: #FFD700;"> El siguiente código para crear una nueva contraseña: <strong>${recoverPassCode}</strong></p>
            <br>
            <p style="font-size: 16px; color: #FFD700;">Para crear la nueva contraseña pincha:</p> 
            <br> 
            <a href="${RECOVERPASS_URL}" style="font-family: Arial, sans-serif; display: inline-block; background-color: #FFD700; color: #333; text-decoration: none; padding: 10px 20px; border-radius: 5px;">aquí</a></p>
            <br>  
            <p style="font-size: 16px; color: #FFD700;">Si no has sido tú ignora este email.</p>
        `;

        // Enviamos el email de verificación al usuario.
        await sendMail(email, emailSubject, emailBody);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación de contraseña enviado',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoverPassController;
