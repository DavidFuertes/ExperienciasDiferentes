import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const addNewExperienceSchema = joi.object({
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
    image: joi
        .string()
        .pattern(
            new RegExp(
                /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(jpg|jpeg|png|gif)$/,
            ),
        )
        .required()
        .messages({
            ...joiErrorMessages,
            'string.pattern.base':
                'La URL de la imagen debe comenzar con "http://" o "https://", seguido opcionalmente de "www.", seguido de caracteres válidos, y terminar con una extensión de imagen válida (jpg, jpeg, png, gif)',
        }),
    date: joi.date().iso().required().messages(joiErrorMessages),
    price: joi
        .number()
        .positive()
        .precision(2)
        .required()
        .messages(joiErrorMessages),
    min_places: joi.number().min(5).required().messages(joiErrorMessages),
    total_places: joi.number().max(25).required().messages(joiErrorMessages),
});
