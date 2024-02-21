const express = require('express');

const Talker = require('./controllers/talker.controller');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(express.json());

app.get('/talker', Talker.getAll);
app.get('/talker/search', Talker.getByQuery);
app.get('/talker/:id', Talker.getTalkerById);
app.post('/login', Talker.login);
app.post('/talker', validateJWT, Talker.addTalker);
app.put('/talker/:id', validateJWT, Talker.updateTalker);
app.delete('/talker/:id', Talker.deleteTalker);

module.exports = app;