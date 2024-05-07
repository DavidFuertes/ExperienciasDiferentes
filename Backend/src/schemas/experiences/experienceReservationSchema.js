import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const experienceReservationSchema = joi.object({
    experience_id: joi.number().required().messages(joiErrorMessages),
    cancelation: joi.number().valid(0, 1).required().messages(joiErrorMessages),
});
