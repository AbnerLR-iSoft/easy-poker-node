const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().max(22).required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(1).max(255).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().min(8).max(22).required(),
});

module.exports = {
  loginSchema,
  signupSchema,
};
