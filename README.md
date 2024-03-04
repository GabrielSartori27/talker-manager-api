# Projeto Talker Manager API

# Contexto
Este projeto é a refatoração da minha primeira API criada com Node.js durante o curso de Desenvolvimento Web Full Stack da [Trybe](https://www.betrybe.com/formacao-desenvolvimento-web). Originalmente a API era responsável por realizar um CRUD em um arquivo JSON com informações sobre palestrantes (talkers) e suas palestras (talks).

Como esta foi minha primeira API desenvolvida durante o curso, tive a ideia de realizar sua refatoração acrescentando os principais conteúdos estudados durante o módulo de Back-end. Assim, adicionei no projeto conceitos de arquitetura de software MSC, ORM com Sequelize, banco de dados MYSQL, autenticação com JWT Token, validações usando schemas e criptografia de senhas com bcrypt.

Refatorar a primeira API do curso foi uma excelente maneira de revisar e praticar os principais conteúdos abordados. Caso tenha interesse é possível visualizar o código original do projeto no arquivo `previous-code.js` e ter uma ideia de como ele evoluiu.

## Técnologias utilizadas

NodeJS, ExpressJS, MYSQL, ES6, Sequelize ORM, JWT Token, bcrypt, Joi. 

## Configurando o Projeto

### Clonando o repositório

```bash
git clone git@github.com:GabrielSartori27/talker-manager-api.git

cd talker-manager-api
```

###  Configure o arquivo .env:
* Você vai encontrar o arquivo .env.example no projeto. Mude seu nome para .env e altere as informações presentes para que correspondam as suas próprias informações.
* Estrutura do arquivo:  
```bash
#### SERVER VARS
NODE_ENV=development
PORT=3001

#### DATABASE VARS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=talker_manager_db
MYSQL_USER=root
MYSQL_PASSWORD=yourMysqlPassword

#### SECRECT VARS
JWT_SECRET=yourSecretWord



```

### Rodando com Docker:
* Inicie o container e instale as dependências:
```bash
docker-compose up -d
docker exec -it talker_manager_api bash 
npm install
```
### Rodando Localmente:
Observação: para rodar localmente é necessário ter o MySQL instalado em sua máquina.
* Instale as dependências:
```bash 
npm install
``` 
## Executando aplicação

* Para criar e popular o banco de dados:
  ```
  npm run create
  npm run migrate
  npm run seed
  ``` 

* Para iniciar a aplicação:

  ```
  npm start
  ```
    

## Documentação

A documentação da API foi criada  utilizando o Swagger. Assim que a aplicação estiver rodando ela pode ser acessada pela seguinte url:  

  ```
    http://localhost:3001/api-docs/
  ```

