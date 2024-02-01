const TalkerService = require('../services/talker.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
    try {
      const talkers = await TalkerService.getAll();
      return res.status(200).json(talkers);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Error' });
    }
  };

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await TalkerService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);
  
  res.status(200).json(message);

}

  module.exports = {
      getAll,
      getTalkerById,
  }