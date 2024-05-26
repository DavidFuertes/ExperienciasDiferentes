import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

export const createExperienceSchema = joi.object({
  title: joi.string().required().min(10).max(50).messages(joiErrorMessages),
  description: joi
    .string()
    .required()
    .min(20)
    .max(200)
    .messages(joiErrorMessages),
  type: joi
    .string()
    .valid("Relajado", "Medio", "Adrenalina pura")
    .required()
    .when("$type", {
      is: joi.string().valid("Relajado", "Medio", "Adrenalina pura"),
      then: joi
        .string()
        .valid("Relajado", "Medio", "Adrenalina pura")
        .messages({
          "any.only":
            "El campo tipo de experiencia debe ser uno de los siguientes: Relajado, Medio, Adrenalina pura",
        }),
      otherwise: joi.string().valid("Relajado", "Medio", "Adrenalina pura"),
    })
    .messages(joiErrorMessages),
  city: joi.string().required().min(3).max(50).messages(joiErrorMessages),
  newImage: joi
    .any()
    .allow(null)
    .meta({
      type: "file",
    })
    .when("file.mimetype", {
      is: joi.string().valid("image/jpg", "image/jpeg", "image/png"),
      then: joi.any().meta({
        mimeType: "image/jpg,image/jpeg,image/png",
      }),
      otherwise: joi.any().invalid().messages(joiErrorMessages),
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
