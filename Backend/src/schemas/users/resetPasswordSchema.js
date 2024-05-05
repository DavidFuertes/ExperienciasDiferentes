import Joi from 'joi';

// Esquema para validar la solicitud de restablecimiento de contraseña.
const resetPasswordSchema = Joi.object({
    userId: Joi.string().required(),
    newPassword: Joi.string()
        .min(8)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref('newPassword'),
    resetCode: Joi.string().required(),
});

export default resetPasswordSchema;
