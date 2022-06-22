const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getList = () => {
  const talkerFile = './talker.json';
  const data = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  return data;
};

app.get('/talker', (req, res) => {
  const talkersList = getList();
  res.status(200).json(talkersList);
});

app.get('/talker/:id', (req, res) => {
  const talkersList = getList();
  const { id } = req.params;
  const talker = talkersList.find((t) => t.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
