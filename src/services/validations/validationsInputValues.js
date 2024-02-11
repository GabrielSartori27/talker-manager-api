const { idSchema, emailSchema, passwordSchema, 
  ageSchema, nameSchema, talkSchema } = require('./schemas');

const validateId = (id) => {  
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" deve ser um número' };
  
  return { type: null };
};

const validateEmail = (email) => {
  if (!email) return { type: 'INVALID_VALUE', message: 'O campo "email" é obrigatório' };
  const { error } = emailSchema.validate(email);
  if (error) {
 return { type: 'INVALID_VALUE', 
    message: 'O "email" deve ter o formato "email@email.com"' }; 
}
    
  return { type: null };
};

const validatePassword = (password) => {
    if (!password) {
 return { type: 'INVALID_VALUE', 
      message: 'O campo "password" é obrigatório' }; 
}
    const { error } = passwordSchema.validate(password);
    if (error) {
 return { type: 'INVALID_VALUE', 
      message: 'O "password" deve ter pelo menos 6 caracteres' }; 
}

    return { type: null };
};

const validateAge = (age) => {
  if (!age) return { type: 'INVALID_VALUE', message: 'O campo "age" é obrigatório' };
  const { error } = ageSchema.validate(age);
  if (error) {
 return { type: 'INVALID_VALUE', 
    message: 'A pessoa palestrante deve ser maior de idade' }; 
}

  return { type: null };
};

const validateName = (name) => {
  if (!name) return { type: 'INVALID_VALUE', message: 'O campo "name" é obrigatório' };
  const { error } = nameSchema.validate(name);
  if (error) {
 return { type: 'INVALID_VALUE', 
    message: 'O "name" deve ter pelo menos 3 caracteres' }; 
}

  return { type: null };
};

const validateTalk = (talk) => {
  if (!talk) {
 return { type: 'INVALID_VALUE', 
    message: 'O campo "talk" é obrigatório' }; 
}
  const { error } = talkSchema.validate(talk);
  const errorMessage = `${error}`.replace('ValidationError: ', '');
  if (error) return { type: 'INVALID_VALUE', message: errorMessage };

  return { type: null };
};

const validateTalker = (name, age, email, password) => {
  const emailError = validateEmail(email);
  if (emailError.type) return emailError;
  const passwordError = validatePassword(password);
  if (passwordError.type) return passwordError;
  const nameError = validateName(name);
  if (nameError.type) return nameError;
  const ageError = validateAge(age);
  if (ageError.type) return ageError;

  return { type: null };
};

module.exports = {
  validateId,
  validateEmail,
  validatePassword,
  validateAge,
  validateName,
  validateTalk,
  validateTalker,
};