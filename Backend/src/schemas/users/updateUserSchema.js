// Importamos joi.
import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema para validar el body de la petición. y mensaje de error con joi
export const updateUserSchema = joi.object({
    name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
    date: joi.date().iso().messages(joiErrorMessages),
    avatar: joi.string().uri().messages(joiErrorMessages),
    //ToDo: validar correctamente el avatar
});
