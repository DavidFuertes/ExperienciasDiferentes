import { getPool } from '../../db/poolQuery.js';
import { experienceReservationSchema } from '../../schemas/experiences/experienceReservationSchema.js';
import validateSchema from '../../utilities/validateSchema.js';
import { alreadyReserved, notReserved } from '../../services/errorService.js';

import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

import { sendMail } from '../../utilities/sendMail.js';
import { selectExperienceByIdModel } from '../../models/experience/selectExperienceByIdModel.js';

async function experienceReservation(req, res, next) {
    const newReservation = req.body;
    const { experience_id, cancelation } = newReservation;
    const { id } = req.user;

    try {
        // Validamos el body con Joi
        await validateSchema(experienceReservationSchema, req.body);
        const pool = await getPool();

        // Obtenemos los datos del body.
        const user = await selectUserByIdModel(id);
        const experience = await selectExperienceByIdModel(experience_id);

        // Obtener la fecha de la experiencia en formato de fecha
        const fechaExperiencia = new Date(experience.date);

        // Obtener el día del mes
        const dia = fechaExperiencia.getDate();

        // Obtener el mes en formato de texto completo
        const mes = fechaExperiencia.toLocaleString('es-ES', { month: 'long' });

        // Obtener el año
        const año = fechaExperiencia.getFullYear();

        // Formatear la fecha en el formato deseado
        const formattedDate = `${dia} de ${mes} del ${año}`;

        if (cancelation) {
            const now = new Date();
            const hoursDifference = (fechaExperiencia - now) / (1000 * 60 * 60);

            if (hoursDifference < 24) {
                return res.status(400).send({
                    message:
                        'No puedes cancelar la experiencia con menos de 24 horas de anticipación.',
                });
            }
            // Si es una solicitud de cancelación, intenta cancelar la reserva
            const hasReserved = await checkIfUserAlreadyReserved(
                pool,
                id,
                experience_id,
            );
            if (!hasReserved) {
                notReserved();
            }

            const cancelResult = await cancelReservation(
                pool,
                id,
                experience_id,
            );

            // Asunto del email de verificación.
            const emailSubject =
                'Has cancelado una experiencia en Experiencias Diferentes';

            // Cuerpo del email de verificación.
            const emailBody = `<!DOCTYPE html>
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
        margin-left: 10px; 
        }

         main {
            text-align: left; 
            padding: 20px; 

        p {
            color: #000;
            margin-bottom: 10px; 
        }
    </style>
    </head>
    <body>
        <header>
        <img src="https://i.postimg.cc/9F62RMj7/XP.png" alt="Icono de XP EXPERIENCIAS DIFERENTES">
        <h1>XP</h1><h2>EXPERIENCIAS DIFERENTES</h2>
        </header>
    <main>
        <p style="font-size: 18px;">Hola ${user.name}</p>
        <br>
        <p style="font-size: 16px;">Has cancelado la reserva de la experiencia: <strong>${experience.title}</strong></p>
        <br>
        <p style="font-size: 16px;">Es una lástima que hayas cancelado la reserva, esperemos verte pronto con nosotros.</p>
    </main>
    </body>
    </html>`;
            // Enviamos el email al usuario.
            await sendMail(user.email, emailSubject, emailBody);

            // Si se canceló la reserva, envía un mensaje de éxito
            return res.status(200).send({
                message:
                    'Reserva cancelada correctamente. En breve recibirás un email de la cancelación de tu reserva.',
            });
        } else {
            // Si no es una solicitud de cancelación, verifica si ya ha reservado esta experiencia el usuario
            const hasReserved = await checkIfUserAlreadyReserved(
                pool,
                id,
                experience_id,
            );
            if (hasReserved) {
                // Si ya ha reservado esta experiencia, envía un mensaje de error
                alreadyReserved();
            }

            // Si no ha reservado esta experiencia, realiza la reserva
            const insertResult = await insertReservation(
                pool,
                id,
                experience_id,
            );

            // Asunto del email de verificación.
            const emailSubject =
                'Has reservado una experiencia en Experiencias Diferentes';

            // Cuerpo del email de verificación.
            const emailBody = `<!DOCTYPE html>
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
        margin-left: 10px; 
        }

        main {
            text-align: left; 
            padding: 20px; 
        }

        p {
            color: #000;
            margin-bottom: 10px; 
        }
  
    </style>
    </head>
    <body>
        <header>
        <img src="https://i.postimg.cc/9F62RMj7/XP.png" alt="Icono de XP EXPERIENCIAS DIFERENTES">
        <h1>XP</h1><h2>EXPERIENCIAS DIFERENTES</h2>
        </header>
    <main>
        <p style="font-size: 18px;">Hola ${user.name}</p>
        <br>
        <p style="font-size: 16px;">Gracias por reservar la experiencia: <strong>${experience.title}</strong></p>
        <br>
        <p style="font-size: 16px;"><strong><em><u>Detalles de la reserva</u></em></strong></p>
        <p style="font-size: 16px;"><strong><em>Nombre de la experiencia:</em></strong> ${experience.title}</p>
        <p style="font-size: 16px;"><strong><em>Descripción:</em></strong> ${experience.description}</p>
        <p style="font-size: 16px;"><strong><em>Tipo:</em></strong> ${experience.type}</p>
        <p style="font-size: 16px;"><strong><em>Ciudad:</em></strong> ${experience.city}</p>
        <p style="font-size: 16px;"><strong><em>Fecha:</em></strong> ${formattedDate}</p>
        <p style="font-size: 16px;"><strong><em>Precio:</em></strong> ${experience.price}€</p>
        <p style="font-size: 16px;">Pronto nos pondremos en contancto contigo para más información.</p>
       
    </main>
    </body>
    </html>`;
            // Enviamos el email al usuario.
            await sendMail(user.email, emailSubject, emailBody);

            return res.status(201).send({
                message:
                    'Reserva realizada correctamente. En breve recibirás un email de confirmación de la reserva.',
                newId: insertResult.insertId,
            });
        }
    } catch (error) {
        next(error);
    }
}

async function checkIfUserAlreadyReserved(pool, id, experience_id) {
    const [existingReserve] = await pool.query(
        `
        SELECT id FROM Reservations
        WHERE user_id = ? AND experience_id = ?
        `,
        [id, experience_id],
    );
    return existingReserve.length > 0;
}

async function insertReservation(pool, id, experience_id) {
    const [insertResult] = await pool.query(
        `
        INSERT INTO Reservations (user_id, experience_id)
        VALUES (?, ?)
        `,
        [id, experience_id],
    );
    return insertResult;
}

async function cancelReservation(pool, id, experience_id) {
    const cancelResult = await pool.query(
        `
        DELETE FROM Reservations
        WHERE user_id = ? AND experience_id = ?
        `,
        [id, experience_id],
    );
    return cancelResult;
}

export { experienceReservation };
