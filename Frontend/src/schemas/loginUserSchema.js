// Importamos joi.
import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

// Creamos el esquema de Joi.
export const loginUserSchema = joi.object({
  password: joi
    .string()
    .min(8)
    .max(16)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(joiErrorMessages),
});
