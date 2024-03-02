// const Joi = require('joi');
const Joi = require('joi')
    .extend(require('@joi/date'));

const idSchema = Joi.number().integer().min(1).required();
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();
const ageSchema = Joi.number().integer().min(18).required();
const nameSchema = Joi.string().min(3).required();
const talkSchema = Joi.object({
    watchedAt: Joi.date().format('YYYY-MM-DD').required().messages({
      'date.empty': 'O campo "watchedAt" é obrigatório',
      'date.format': 'O campo "watchedAt" deve ter o formato "aaaa-mm-dd"',
    }),
    rate: Joi.number().min(1).max(5).required()
.messages({
      'number.empty': 'O campo "rate" é obrigatório',
      'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
      'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
    }),
});

module.exports = {
  idSchema,
  emailSchema,
  passwordSchema,
  ageSchema,
  nameSchema,
  talkSchema,
};