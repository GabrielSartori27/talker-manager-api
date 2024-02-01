const { Talker } = require('../models/index');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
    const talkers = await Talker.findAll({attributes:{exclude: ['password']}});
    return { type: null, message: talkers };
};

const findById = async (id) => {
    const error = schema.validateId(id);
    if (error.type) return error;
    
    const talker = await Talker.findByPk(id, {attributes: {exclude: ['password']}});
    if (!talker) return { type: 'TALKER_NOT_FOUND', message: 'Talker not found' };

    return { type: null, message: talker };
};

module.exports = {
    findAll,
    findById,
};