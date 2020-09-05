const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas

const SessionController = require('../app/controllers/sessionController')
const UserController = require('../app/controllers/userController')
const Validator = require('../app/validators/user')

/*
//login/logout - SESSION CONTROLLER
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionController.login)
routes.post('/logout', SessionController.logout)

//reset password / forgot
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionController.forgot)
routes.post('/password-reset', SessionController.reset)


//user register UserController
//criaçao
//atualização
//remoção
*/
routes.get('/register', UserController.registerForm)
routes.post('/register', Validator.post, UserController.post)

routes.get('/', UserController.show)
/*
routes.put('/', UserController.update)
routes.delete('/', UserController.delete)
*/

module.exports = routes
