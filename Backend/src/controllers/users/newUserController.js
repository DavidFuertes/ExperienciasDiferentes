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

const { VALIDATE_USER_URL, ASSETS_PATH, DEFAULT_AVATAR_URL } = process.env;

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
       <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <link href="https://fonts.googleapis.com/css2?family=Karma:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Karma', sans-serif;
            text-align: center;
            background-color: #F4CBA4;
            padding: 20px;
            margin: 0;
        }
        header {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
          
        }
        header img {
            height: 75px;
           
        }
        header h1 {
        font-size: 24px;
        margin: 0;
        color: #F4CBA4;
        }

        header h2 {
        font-size: 24px;
        margin: 0;
        color: #F4CBA4;
        margin-left: 10px; /* Agrega un margen superior al h2 */
        }

        p {
            color: #000;
        }
        a {
            font-family: 'Karma', sans-serif;
            display: inline-block;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
    </style>
    </head>
    <body>
        <header>
        <img src="https://i.postimg.cc/9F62RMj7/XP.png" alt="Icono de XP EXPERIENCIAS DIFERENTES">
        <h1>XP</h1><h2>EXPERIENCIAS DIFERENTES</h2>
        </header>
    <main>
        <p style="font-size: 18px;">¡Bienvenid@ <strong>${username}!</strong></p>
        <br>
        <p style="font-size: 16px;">Gracias por registrarte en: <strong>XP EXPERIENCIAS DIFERENTES</strong></p>
        <br>
        <p style="font-size: 16px;">Para activar tu cuenta, haz clic en el siguiente enlace:</p>
        <br>
        <p>
            <a href="${VALIDATE_USER_URL}${registrationCode}">¡Activar mi cuenta!</a>
        </p>
    </main>
    </body>
    </html>

        `;

        // Enviamos el email de verificación al usuario.
        await sendMail(email, emailSubject, emailBody);

        res.status(201).send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, verifica tu usuario mediante el email que has recibido.',
        });
    } catch (err) {
        next(err);
    }
};
