import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages";

export const forgetPasswordSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(joiErrorMessages),
});
