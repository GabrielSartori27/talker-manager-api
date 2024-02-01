const express = require('express');

const Talker = require('./controllers/talker.controller');

const app = express();

app.use(express.json());

app.get('/talker', Talker.getAll);
app.get('/talker/:id', Talker.getTalkerById);

module.exports = app;