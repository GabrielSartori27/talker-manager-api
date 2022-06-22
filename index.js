const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const crypto = require('crypto');

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

// The function "validateEmail" was taken from the site: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  switch (true) {
    case !email:
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    case !validateEmail(email):
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    case !password:
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    case password.length < 6:
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    default:
      return res.status(200).json({ token });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
