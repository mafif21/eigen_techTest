import Joi from "joi";

const createBookValidation = Joi.object({
  code: Joi.string().max(100).min(1).required,
  title: Joi.string().max(100).min(1).required,
  author: Joi.string().max(100).min(1).required,
  stock: Joi.number().integer().min(0).required,
});

export { createBookValidation };
