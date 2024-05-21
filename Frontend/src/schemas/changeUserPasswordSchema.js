// Importamos joi.
import joi from "joi";

// Importamos joiErrorMessages.
import { joiErrorMessages } from "./joiErrorMessages.js";

// Esquema para validar el body de la petición. y mensaje de error con joi
export const changeUserPasswordSchema = joi.object({
  currentPassword: joi
    .string()
    .min(4)
    .max(200)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
  newPassword: joi
    .string()
    .min(4)
    .max(200)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
});
