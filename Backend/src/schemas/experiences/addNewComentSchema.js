import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const addNewComentSchema = joi.object({
    content: joi
        .string()
        .min(1)
        .max(200)
        .required()
        .messages(joiErrorMessages),
    rate: joi.number().min(1).max(5).messages(joiErrorMessages),
});
