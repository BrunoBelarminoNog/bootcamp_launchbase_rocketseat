const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const instructors = require("./app/controllers/instructors")
const members = require("./app/controllers/members")



//HTTP VERBS
//GET -> receber RESOURCE (devolve dados/resource)
//POST -> criar ou salvar (criar um novo resource com dados enviados)
//PUT -> atualizar (atualizar dados/resource)
//DELETE -> deletar (apagar dado/resouce)


routes.get('/', function(req, res){
    return res.redirect('/instructors')
})

//ROTAS INSTRUCTORS
routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
//.post responsavel pela rota de pegar as informações submetidas pelo formulario com method="POST"
routes.post('/instructors', instructors.post)
routes.put('/instructors', instructors.put)
routes.delete("/instructors", instructors.delete)


//ROTAS MEMBERS
routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
//.post responsavel pela rota de pegar as informações submetidas pelo formulario com method="POST"
routes.post('/members', members.post)
routes.put('/members', members.put)
routes.delete("/members", members.delete)


module.exports = routes