import Joi from "joi";

const bookLoanValidation = Joi.object({
  memberId: Joi.string().max(100).min(1).required(),
  bookId: Joi.string().max(100).min(1).required(),
});

export { bookLoanValidation };
