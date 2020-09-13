//npm install express-session connect-pg-simple
//express-session: trabalha todas as ideias de criar a sessão de usuarios
//connect-pg-simple cria a sessao de usuarios no banco de dados do postgresql

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const db = require('./db');

module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: 'iabadabadu',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
})