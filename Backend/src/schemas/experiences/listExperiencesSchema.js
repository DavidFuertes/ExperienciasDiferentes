import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const listExperiencesSchema = joi.object({
    title: joi.string().messages(joiErrorMessages),
    city: joi.string().messages(joiErrorMessages),
    isActive: joi.number().valid(0, 1).messages(joiErrorMessages),
    isConfirmed: joi.number().valid(0, 1).messages(joiErrorMessages),
    search: joi
        .string()
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .allow(null, '')
        .messages(joiErrorMessages),
    type: joi
        .string()
        .allow(null, '')
        .valid('Relajado', 'Medio', 'Adrenalina pura')
        .messages(joiErrorMessages),
    sortBy: joi
        .string()
        .allow(null, '')
        .valid('average_rating', 'date', 'price', 'total_places')
        .messages(joiErrorMessages),
    sortOrder: joi
        .string()
        .allow(null, '')
        .valid('asc', 'desc')
        .messages(joiErrorMessages),
});
