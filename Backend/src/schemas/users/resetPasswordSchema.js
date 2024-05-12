import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

// Esquema para validar la solicitud de restablecimiento de contraseña.
export const resetPasswordSchema = joi.object({
    recoverCode: joi.string().required(),
    password: joi

        .string()
        .min(8)
        .max(200)
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/,
        )
        .required()
        .messages(joiErrorMessages),
    newPassword: joi

        .string()
        .min(8)
        .max(200)
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/,
        )
        .required()
        .messages(joiErrorMessages),
});
