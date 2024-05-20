// Importamos joi.
import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema para validar el body de la petición. y mensaje de error con joi
export const updateUserSchema = joi.object({
    name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    date: joi.date().messages(joiErrorMessages),
    avatar: joi.string().messages(joiErrorMessages),
    residence: joi.string().messages(joiErrorMessages),
    languages: joi.string().messages(joiErrorMessages),
    password: joi
        .string()
        .min(8)
        .max(200)
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/,
        )
        .required()
        .messages(joiErrorMessages),
});
