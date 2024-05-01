import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const experienceRatingSchema = joi.object({
    experience_id: joi.number().required().messages(joiErrorMessages),
    rating: joi.number().min(1).max(5).required().messages(joiErrorMessages),
});
