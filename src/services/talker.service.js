const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Talker, Talk } = require('../models/index');
const schema = require('./validations/validationsInputValues');

const secret = process.env.JWT_SECRET;

const findAll = async () => {
    const talkers = await Talker.findAll({ attributes: { exclude: ['password'] }, 
    include: 'talks' });
    return { type: null, message: talkers };
};

const findById = async (id) => {
    const error = schema.validateId(id);
    if (error.type) return error;
    
    const talker = await Talker.findByPk(id, { attributes: { exclude: ['password'] }, 
    include: 'talks' });
    if (!talker) return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };

    return { type: null, message: talker };
};

const login = async (email, password) => {
    const emailError = schema.validateEmail(email);
    if (emailError.type) return emailError;
    const passwordError = schema.validatePassword(password);
    if (passwordError.type) return passwordError;
    const user = await Talker.findOne({ where: { email } });
    if (!user) return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };
    
    const token = jwt.sign({ data: { userId: user.id, userEmail: user.email } }, secret, jwtConfig);
    return { type: null, message: token };
};

const addTalker = async (talker) => {
    const { name, age, email, password, talk } = talker;
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

const updateTalk = async (id, talk) => {
    const checkTalk = await Talk.findOne({ where: { talkerId: id } });
    if (!checkTalk) {
        await Talk.create({ talkerId: id, watchedAt: talk.watchedAt, rate: talk.rate });
        return true;
    }
    await Talk.update({ watchedAt: talk.watchedAt, rate: talk.rate }, 
        { where: { talkerId: id } });
    return true;
};

const updateTalker = async (id, talker, data) => {
    const { name, age, talk } = talker;
    const talkerError = schema.validateUpdatedTalker(id, talker);
    if (talkerError.type) return talkerError;
    if (id !== data.id.toString()) {
        return { type: 'INVALID_TOKEN', message: 'Usuário não autorizado' };
    }
    await Talker.update({ fullName: name, age }, { where: { id } });
    await updateTalk(id, talk);
    const updatedTalker = await Talker.findByPk(id, { attributes: { exclude: ['password'] }, 
        include: 'talks' });
    
    return { type: null, message: updatedTalker };
};

const deleteTalker = async (id, data) => {
    const idError = schema.validateId(id);
    if (idError.type) return idError;
    if (id !== data.id.toString()) {
        return { type: 'INVALID_TOKEN', message: 'Usuário não autorizado' };
    }
    const talker = await Talker.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!talker) return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };

    await Talker.destroy({ where: { id } });
    await Talk.destroy({ where: { talkerId: id } });

    return { type: null };
};

const findByQuery = async (query) => {
    if (!query) {
        const allTalkers = await Talker.findAll({ attributes: { exclude: ['password'] }, 
            include: 'talks' });
        return { type: null, message: allTalkers };
    }

    const talker = await Talker.findAll({ 
        where: { fullName: { [Op.like]: `%${query}%` } }, 
                attributes: { exclude: ['password'] },
                include: 'talks', 
    });

    if (!talker) return { type: null, message: [] };

    return { type: null, message: talker };
};

module.exports = {
    findAll,
    findById,
    login,
    addTalker,
    updateTalker,
    deleteTalker,
    findByQuery,
};