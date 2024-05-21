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
        .valid('Relajado', 'Medio', 'Adrenalina Pura')
        .required()
        .messages(joiErrorMessages),
    city: joi.string().required().min(3).max(50).messages(joiErrorMessages),
    image: joi.string().uri().required().messages(joiErrorMessages),
    date: joi.date().iso().required().messages(joiErrorMessages),
    price: joi
        .number()
        .positive()
        .precision(2)
        .required()
        .messages(joiErrorMessages),
    min_places: joi.number().min(5).required().messages(joiErrorMessages),
    total_places: joi.number().max(25).required().messages(joiErrorMessages),
    is_active: joi.number().valid(0, 1).required().messages(joiErrorMessages),
});
