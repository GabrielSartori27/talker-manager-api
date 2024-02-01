const { Talker } = require('../models/index');
const schema = require('./validations/validationsInputValues');
const crypto = require('crypto');

const findAll = async () => {
    const talkers = await Talker.findAll({attributes:{exclude: ['password']}});
    return { type: null, message: talkers };
};

const findById = async (id) => {
    const error = schema.validateId(id);
    if (error.type) return error;
    
    const talker = await Talker.findByPk(id, {attributes: {exclude: ['password']}});
    if (!talker) return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };

    return { type: null, message: talker };
};

const login = async (email, password) => {
    const emailError = schema.validateEmail(email);
    if (emailError.type) return emailError;
    const passwordError = schema.validatePassword(password);
    if(passwordError.type) return passwordError;

    const user = await Talker.findOne({ where: { email, password } });
    if(!user) return {type: 'USER_NOT_FOUND', message: "Usuário não encontrado"};

    const token = crypto.randomBytes(8).toString('hex');
    return {type: null, message: token };
}

module.exports = {
    findAll,
    findById,
    login,
};