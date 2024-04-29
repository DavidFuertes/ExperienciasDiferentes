// Importamos las dependencias.
import nodemailer from 'nodemailer';

// Importamos las variables de entorno.
import 'dotenv/config.js';
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

// Importamos los errores.
import { sendEmailError } from '../services/errorService.js';

// Creamos una conexión para poder enviar emails con nodemailer.
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Función que envía un mail al usuario

export const sendMail = async (email, subject, body) => {
  try {
    // Creamos un objeto con la configuaración del emial.
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject,
      html: body,
    };
    //Enviamos el mail.
    await transport.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
    sendEmailError();
  }
};
