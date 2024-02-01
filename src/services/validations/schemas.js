const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6)
.required()

module.exports = {
  idSchema,
  emailSchema,
  passwordSchema,
};