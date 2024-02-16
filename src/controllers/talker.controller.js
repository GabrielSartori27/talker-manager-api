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

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json({ token: message });
};

const addTalker = async (req, res) => {
  const { name, age, email, password, talk } = req.body;
  const { type, message } = await TalkerService.addTalker(name, age, email, password, talk);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(message);
};

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { type, message } = await TalkerService.updateTalker(id, name, age, talk);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await TalkerService.deleteTalker(id);
  
  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(204).end();
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  const { message } = await TalkerService.findByQuery(q);

  return res.status(200).json(message);
};

  module.exports = {
      getAll,
      getTalkerById,
      login,
      addTalker,
      updateTalker,
      deleteTalker,
      getByQuery,
  };