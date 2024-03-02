const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const swagger_path =  path.resolve(__dirname,'./swagger.yaml');
const file  = fs.readFileSync(swagger_path, 'utf8');
const swaggerDocument = YAML.parse(file);
const cors = require('cors');

const Talker = require('./controllers/talker.controller');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/talker', Talker.getAll);
app.get('/talker/search', validateJWT, Talker.getByQuery);
app.get('/talker/:id', Talker.getTalkerById);
app.post('/login', Talker.login);
app.post('/talker', validateJWT, Talker.addTalker);
app.put('/talker/:id', validateJWT, Talker.updateTalker);
app.delete('/talker/:id', validateJWT, Talker.deleteTalker);

module.exports = app;