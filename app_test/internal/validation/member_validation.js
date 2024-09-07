import Joi from "joi";

const createMemberValidation = Joi.object({
  code: Joi.string().max(100).min(1).required(),
  name: Joi.string().max(100).min(1).required(),
});

export { createMemberValidation };
