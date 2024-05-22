import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const editExperienceSchema = joi.object({
    title: joi.string().required().min(10).max(50).messages(joiErrorMessages),
    description: joi
        .string()
        .required()
        .min(20)
        .max(200)
        .messages(joiErrorMessages),
    type: joi
        .string()
        .valid('Relajado', 'Medio', 'Adrenalina pura')
        .required()
        .messages(joiErrorMessages),
    city: joi.string().required().min(3).max(50).messages(joiErrorMessages),
    newImage: joi
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
    date: joi.date().iso().required().messages(joiErrorMessages),
    price: joi
        .number()
        .positive()
        .precision(2)
        .required()
        .messages(joiErrorMessages),
    min_places: joi.number().min(1).required().messages(joiErrorMessages),
    total_places: joi.number().max(25).required().messages(joiErrorMessages),
    is_active: joi.number().valid(0, 1).required().messages(joiErrorMessages),
});
