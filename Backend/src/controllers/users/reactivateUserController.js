import crypto from 'crypto';
import { insertUserModel } from '../../models/users/insertUserModels.js';
import { sendMail } from '../../utilities/sendMail.js';
import 'dotenv/config.js';
import { errorController } from '../errors/errorController.js';

const { VALIDATE_USER_URL } = process.env;

export const reactivateUserController = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email } = req.body;
        console.log(req.body), 'Es este';
        // Genera un nuevo código de reactivación
        const reactivationCode = crypto.randomBytes(15).toString('hex');

        // Inserta el nuevo código de reactivación en la base de datos
        await insertUserModel(email, reactivationCode);

        // Construye el cuerpo del correo electrónico de reactivación
        const emailSubject = 'Reactiva tu cuenta en Experiencias Diferentes :)';
        const emailBody = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
            </head>
            <body>
                <p>¡Hola!</p>
                <p>Haz clic en el siguiente enlace para reactivar tu cuenta:</p>
                <p><a href="${VALIDATE_USER_URL}${reactivationCode}">Reactivar mi cuenta</a></p>
            </body>
            </html>
        `;

        // Envía el correo electrónico de reactivación al usuario
        await sendMail(email, emailSubject, emailBody);

        // Envía una respuesta al cliente
        res.status(200).json({
            message:
                'Se ha enviado un correo electrónico de reactivación. Por favor, revisa tu bandeja de entrada.',
        });
    } catch (error) {
        // Maneja cualquier error que ocurra durante el proceso
        next(error); // Llama a 'next' en caso de error
    }
};
