const { Talker } = require('../models/index');

const getAll = async () => {
    const talkers = await Talker.findAll();
    return talkers;
};


module.exports = {
    getAll,
};