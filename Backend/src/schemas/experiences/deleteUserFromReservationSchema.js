import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const deleteUserFromReservationSchema = joi.object({
    reservation_id: joi.number().required().messages(joiErrorMessages),
});
