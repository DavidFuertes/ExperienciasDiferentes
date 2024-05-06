import Joi from 'joi';

// Esquema para validar la solicitud de restablecimiento de contraseña.
const resetPasswordSchema = Joi.object({
    recoverCode: Joi.string().required(),
    password: Joi.string().min(8).required(),
    //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export default resetPasswordSchema;
