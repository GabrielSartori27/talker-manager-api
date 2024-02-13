const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Talker, Talk } = require('../models/index');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
    const talkers = await Talker.findAll({ attributes: { exclude: ['password'] }, include: 'talks' });
    return { type: null, message: talkers };
};

const findById = async (id) => {
    const error = schema.validateId(id);
    if (error.type) return error;
    
    const talker = await Talker.findByPk(id, { attributes: { exclude: ['password'] }, include: 'talks' });
    if (!talker) return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };

    return { type: null, message: talker };
};

const login = async (email, password) => {
    const emailError = schema.validateEmail(email);
    if (emailError.type) return emailError;
    const passwordError = schema.validatePassword(password);
    if (passwordError.type) return passwordError;

    const user = await Talker.findOne({ where: { email, password } });
    if (!user) return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };

    const token = crypto.randomBytes(8).toString('hex');
    return { type: null, message: token };
};

const addTalker = async (name, age, email, password, talk) => {
    const talkerError = schema.validateTalker(name, age, email, password);
    if (talkerError.type) return talkerError;
    const talkError = schema.validateTalk(talk);
    if (talkError.type) return talkError;
    
    const hash = bcrypt.hashSync(password, 10);
    
    const { id } = await Talker.create({ fullName: name, age, email, password: hash });
    await Talk.create({ talkerId: id, watchedAt: talk.watchedAt, rate: talk.rate });
    const newTalker = await Talker.findByPk(id, { attributes: { exclude: ['password'] }, 
        include: 'talks' });

    return { type: null, message: newTalker };
};

const updateTalker = async (id, name, age, talk) => {
    const idError = schema.validateId(id);
    if (idError.type) return idError;
    const nameError = schema.validateName(name);
    if (nameError.type) return nameError;
    const ageError = schema.validateAge(age);
    if (ageError.type) return ageError;
    const talkError = schema.validateTalk(talk);
    if (talkError.type) return talkError;

    await Talker.update({ fullName: name, age }, { where: { id } });
    await Talk.update({ watchedAt: talk.watchedAt, rate: talk.rate }, 
        { where: { talkerId: id } });
    const talker = await Talker.findByPk(id, { attributes: { exclude: ['password'] }, 
        include: 'talks' });

    return { type: null, message: talker };
};

const deleteTalker = async (id) => {
    const idError = schema.validateId(id);
    if (idError.type) return idError;

    await Talker.destroy({where: {id}});
    await Talk.destroy({where:{talkerId: id}});

    return {type: null};
}

module.exports = {
    findAll,
    findById,
    login,
    addTalker,
    updateTalker,
    deleteTalker,
};