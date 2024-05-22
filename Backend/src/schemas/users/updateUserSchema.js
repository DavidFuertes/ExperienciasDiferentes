// Importamos joi.
import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema para validar el body de la petición. y mensaje de error con joi
export const updateUserSchema = joi.object({
    name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    date: joi.date().messages(joiErrorMessages),
    avatar: joi
        .any()
        .meta({
            type: 'file',
        })
        .when('file.mimetype', {
            is: joi.string().valid('image/jpg', 'image/jpeg', 'image/png'),
            then: joi.any().meta({
                mimeType: 'image/jpg,image/jpeg,image/png',
            }),
            otherwise: joi.any().invalid().messages(joiErrorMessages),
        }),
    residence: joi.string().messages(joiErrorMessages),
    languages: joi.string().messages(joiErrorMessages),
});
