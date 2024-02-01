const { idSchema, emailSchema, passwordSchema } = require('./schemas');

const validateId = (id) => {  
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" deve ser um número' };
  
  return { type: null };
};

const validateEmail = (email) => {
    if(!email) return {type: 'INVALID_VALUE', message: "O campo \"email\" é obrigatório"};
    const { error } = emailSchema.validate(email);
    if (error) return { type: 'INVALID_VALUE', message: "O \"email\" deve ter o formato \"email@email.com\"" };
    
    return { type: null };
}

const validatePassword = (password) => {
    if(!password) return {type: 'INVALID_VALUE', message: "O campo \"password\" é obrigatório"};
    const { error } = passwordSchema.validate(password);
    if(error) return {type: 'INVALID_VALUE', message: "O \"password\" deve ter pelo menos 6 caracteres"};

    return { type: null };
}

module.exports = {
  validateId,
  validateEmail,
  validatePassword,
};