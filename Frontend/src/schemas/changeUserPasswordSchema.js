import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

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
  confirmNewPassword: joi
    .string()
    .valid(joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Las contraseñas no coinciden",
      "string.empty": "Debes confirmar tu nueva contraseña",
      "any.required": "Debes confirmar tu nueva contraseña",
    }),
});
