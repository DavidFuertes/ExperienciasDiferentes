// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi.
const loginUserSchema = joi.object({
    password: joi
        .string()
        .min(8)
        .max(16)
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/,
        )
        .required()
        .messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

export default loginUserSchema;
