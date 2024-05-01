import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const listExperiencesSchema = joi.object({
    title: joi.string().messages(joiErrorMessages),
    city: joi.string().messages(joiErrorMessages),
    isActive: joi.number().valid(0, 1).messages(joiErrorMessages),
    isConfirmed: joi.number().valid(0, 1).messages(joiErrorMessages),
    sortBy: joi.string().messages(joiErrorMessages),
    sortOrder: joi.string().valid('asc', 'desc').messages(joiErrorMessages),
});
