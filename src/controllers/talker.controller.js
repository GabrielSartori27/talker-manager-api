const TalkerService = require('../services/talker.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { type, message } = await TalkerService.findAll();
  
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await TalkerService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);
  
  res.status(200).json(message);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await TalkerService.login(email, password);

  if(type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json({token: message});
}

  module.exports = {
      getAll,
      getTalkerById,
      login,
  };