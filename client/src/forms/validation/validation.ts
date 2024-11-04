import Joi from "joi";
import { ANY_REQUIRED } from "./error-messages";

export const validationRules = {
  fieldRequired: Joi.string()
    .required()
    .messages({
      ...ANY_REQUIRED,
    }),
  fieldRequiredNumber: Joi.number()
    .required()
    .messages({
      ...ANY_REQUIRED,
    }),
  field: Joi.string(),
  fieldBoolean: Joi.boolean(),
  fieldBooleanRequired: Joi.boolean()
    .required()
    .messages({
      ...ANY_REQUIRED,
    }),
  emailValidate: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      ...ANY_REQUIRED,
      "string.email": "This email is incorrect",
    }),
  phoneNumberValidate: Joi.string()
    .pattern(/^[0-9+]+$/)
    .max(14)
    .required()
    .messages({
      ...ANY_REQUIRED,
      "string.pattern.base":
        "Phone number must contain only numbers and symbols",
      "string.max": "The length of the number must not exceed 13 characters",
    }),
};
