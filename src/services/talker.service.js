const { Talker } = require('../models/index');
const schema = require('./validations/validationsInputValues');

const getAll = async () => {
    const talkers = await Talker.findAll();
    return talkers;
};

const findById = async (id) => {
    const error = schema.validateId(id);
    if (error.type) return error;
    
    const talker = await Talker.findByPk(id);
    if(!talker) return {type: 'TALKER_NOT_FOUND', message: 'Talker not found'};

    return {type: null, message: talker};
}


module.exports = {
    getAll,
    findById,
};