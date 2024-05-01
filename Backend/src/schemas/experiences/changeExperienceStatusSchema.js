import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const changeExperienceStatusSchema = joi.object({
    is_active: joi.number().valid(0, 1).required().messages(joiErrorMessages),
});
