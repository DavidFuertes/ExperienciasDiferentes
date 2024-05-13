import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages";

export const recoverPasswordSchema = joi.object({
  password: joi
    .string()
    .min(8)
    .max(16)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
  confirmPassword: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .messages(joiErrorMessages),
});
