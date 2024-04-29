// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi.
const emailUserSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
});

export default emailUserSchema;