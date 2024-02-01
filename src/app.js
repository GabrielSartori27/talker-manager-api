const express = require('express');

const Talker = require('./controllers/talker.controller');

const app = express();

app.use(express.json());

app.get('/talker', Talker.getAll);

module.exports = app;