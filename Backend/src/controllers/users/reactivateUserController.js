import crypto from 'crypto';
import reactivateUserModel from '../../models/users/reactivateUserModel.js';
import { sendMail } from '../../utilities/sendMail.js';
import 'dotenv/config.js';
import { errorController } from '../errors/errorController.js';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

const { VALIDATE_USER_URL } = process.env;

export const reactivateUserController = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email } = req.body;
        console.log(req.body), 'Es este';

        // Genera un nuevo código de reactivación
        const reactivationCode = crypto.randomBytes(15).toString('hex');

        // Inserta el nuevo código de reactivación en la base de datos
        await reactivateUserModel(email, reactivationCode);

        // Construye el cuerpo del correo electrónico de reactivación
        const emailSubject = 'Reactiva tu cuenta en Experiencias Diferentes :)';
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
                <p style="font-size: 18px;">Hola </p>
                <p style="font-size: 16px;">Haz clic en el siguiente enlace para reactivar tu cuenta:</p>
                <p style="font-size: 16px;"><a href="${VALIDATE_USER_URL}${reactivationCode}">Reactivar mi cuenta</a></p>
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
