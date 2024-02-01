const TalkerService = require('../services/talker.service');

const getAll = async (_req, res) => {
    try {
      const talkers = await TalkerService.getAll();
      return res.status(200).json(talkers);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Error' });
    }
  };

  module.exports = {
      getAll,
  }