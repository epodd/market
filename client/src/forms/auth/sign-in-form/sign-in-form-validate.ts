import Joi from "joi";
import { validationRules } from "../../validation/validation";

export const schemaValidation = Joi.object({
  email: validationRules.emailValidate,
  password: validationRules.fieldRequired,
});
