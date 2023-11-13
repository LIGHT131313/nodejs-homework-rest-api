import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `{"name" missing required name field`,
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" missing required name field`,
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" missing required name field`,
    "string.base": `"phone" must be text`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().messages({
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().messages({
    "string.base": `"phone" must be text`,
  }),
});
