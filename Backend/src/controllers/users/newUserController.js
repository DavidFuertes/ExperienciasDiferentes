// Importamos las dependencias.
import crypto from 'crypto';

// Importamos los modelos.
import { insertUserModel } from '../../models/users/insertUserModels.js';

// Importamos la función que envía emails.
import { sendMail } from '../../utilities/sendMail.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import { newUserSchema } from '../../schemas/users/newUserSchema.js';

// Importamos las variables de entorno.
import 'dotenv/config.js';

const { VALIDATE_USER_URL, ASSETS_PATH } = process.env;

// Función controladora final que crea un nuevo usuario.
export const newUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(newUserSchema, req.body);

        // Obtenemos los datos del body.
        const { username, email, password } = req.body;

        // Creamos un código de registro.
        const registrationCode = crypto.randomBytes(15).toString('hex');

        // Insertamos el usuario.
        await insertUserModel(username, email, password, registrationCode);

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario en Experiencias Diferentes :)';

        // Cuerpo del email de verificación.
        const emailBody = `
              <body style="font-family: Arial, sans-serif; text-align: center; background-color: #333; padding: 20px;">
        <img src="https://i.postimg.cc/9F62RMj7/XP.png" alt="Icono de XP EXPERIENCIAS DIFERENTES" style="width: px; height: 75px;">
        <br>
        <p style="font-size: 18px; color: #FFD700; display: inline-block;">¡Bienvenid@ <strong>${username}!</strong></p>
        <br>
        <p style="font-size: 16px; color: #FFD700;">Gracias por registrarte en:</p> 
        <br> 
        <p style="font-size: 16px; color: #FFD700;"> <strong>XP EXPERIENCIAS DIFERENTES</strong></p>
        <br>
        <p style="font-size: 16px; color: #FFD700;"> Para activar tu cuenta, haz clic en el siguiente enlace:</p>
        <br>
        <p>
            <a href="${VALIDATE_USER_URL}${registrationCode}" style="font-family: Arial, sans-serif; display: inline-block; background-color: #FFD700; color: #333; text-decoration: none; padding: 10px 20px; border-radius: 5px;">¡Activar mi cuenta!</a>
        </p>
    </body>
        `;

        // Enviamos el email de verificación al usuario.
        await sendMail(email, emailSubject, emailBody);

        res.status(201).send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, verifica tu usuario mediante el email que has recibido en tu email',
        });
    } catch (err) {
        next(err);
    }
};
