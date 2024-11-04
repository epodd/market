import Joi from "joi";
import { validationRules } from "../../validation/validation";

export const schemaValidation = Joi.object({
  email: validationRules.emailValidate,
  name: validationRules.fieldRequired,
  password: validationRules.fieldRequired,
});
