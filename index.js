const moment = require('moment');
// npm install -g moment --save
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const crypto = require('crypto');
// const { json } = require('express/lib/response');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getList = async () => {
  const talkerFile = './talker.json';
  const data = fs.readFile(talkerFile, 'utf8')
  .then((result) => JSON.parse(result));
  return data;
};

app.get('/talker', async (req, res) => {
  const talkersList = await getList();
  res.status(200).json(talkersList);
});

app.get('/talker/:id', async (req, res) => {
  const talkersList = await getList();
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

const validateName = (res, name) => {
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
 return res.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
};
const validateAge = (res, age) => {
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
 return res.status(400)
  .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}
};

const validateTalkWatchedAt = (res, talk) => {
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  if (!talk.watchedAt) {
 return res.status(400)
  .json({ message: 'O campo "watchedAt" é obrigatório' }); 
}
  if (!moment(talk.watchedAt, 'DD/MM/YYYY', true).isValid()) {
 return res.status(400)
  .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
};

const checkRateValue = (res, talk) => {
  if (!talk.rate && talk.rate !== 0) {
    return res.status(400)
     .json({ message: 'O campo "rate" é obrigatório' }); 
   }
};

const validateTalkRate = (res, talk) => {
  const checkedValue = checkRateValue(res, talk);
  if (checkedValue) return checkedValue;
  if (talk.rate < 1 || talk.rate > 5 || talk.rate.length > 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateTalk = (res, talk) => {
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  const checkRate = validateTalkRate(res, talk);
  const checkWatchedAt = validateTalkWatchedAt(res, talk);
  if (checkRate) return checkRate;
  if (checkWatchedAt) return checkWatchedAt;
};

const checkInformation = (res, name, talk, age) => {
  const checkedName = validateName(res, name);
  const chechedAge = validateAge(res, age);
  const checkedTalk = validateTalk(res, talk);
  if (checkedName) return checkedName;
  if (chechedAge) return chechedAge;
  if (checkedTalk) return checkedTalk;
};

app.post('/talker', async (req, res) => {
  const { name, age, talk } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  const checkedInformation = checkInformation(res, name, talk, age);
  if (checkedInformation) return checkedInformation;
  let talkerList = await getList();
  fs.writeFile('./talker.json', JSON.stringify([...talkerList, { id: 5,
name,
age, 
  talk: {
    watchedAt: talk.watchedAt,
    rate: talk.rate,
  } }]))
  .then(async () => {
    talkerList = await getList();
    return res.status(201).json(talkerList[talkerList.length - 1]);
  });
});

app.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  const checkedInformation = checkInformation(res, name, talk, age);
  if (checkedInformation) return checkedInformation;
  let talkerList = await getList();
  const talkerId = talkerList.findIndex((element) => element.id === Number(id));
  talkerList[talkerId] = { ...talkerList[talkerId], name, age, talk };
  fs.writeFile('./talker.json', JSON.stringify(talkerList))
      .then(async () => {
        talkerList = await getList();
        return res.status(200).json(talkerList[talkerId]);
      });
});

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  let talkerList = await getList();
  const talkerId = talkerList.findIndex((element) => element.id === Number(id));
  talkerList.splice(talkerId, 1);
  fs.writeFile('./talker.json', JSON.stringify(talkerList))
      .then(async () => {
        talkerList = await getList();
        return res.status(204).end();
      });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
