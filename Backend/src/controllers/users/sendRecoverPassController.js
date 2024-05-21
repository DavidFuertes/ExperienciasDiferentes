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
      <header>
        <img src="https://i.postimg.cc/9F62RMj7/XP.png" alt="Icono de XP EXPERIENCIAS DIFERENTES">
        <h1>XP</h1><h2>EXPERIENCIAS DIFERENTES</h2>
        </header>
    <main>

            <p style="font-size: 16px; color: #000; display: inline-block;">Has solicitado la recuperación de contraseña para este email en: <strong>XP EXPERIENCIAS DIFERENTES</strong>.</p>
            <br>  
            <p style="font-size: 16px; color: #000;">Para crear la nueva contraseña pincha:</p> 
            <br> 
            <a href="${RECOVERPASS_URL}${recoverPassCode}" style="font-family: karma, sans-serif; display: inline-block; background-color: #000; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">AQUÍ</a></p>
            <br>  
            <p style="font-size: 16px; color: ##000;">Si no has sido tú ignora este email.</p>
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
