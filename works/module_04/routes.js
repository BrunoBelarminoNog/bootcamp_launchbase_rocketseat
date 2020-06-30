const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const instructors = require("./instructors")


//HTTP VERBS
//GET -> receber RESOURCE (devolve dados/resource)
//POST -> criar ou salvar (criar um novo resource com dados enviados)
//PUT -> atualizar (atualizar dados/resource)
//DELETE -> deletar (apagar dado/resouce)


routes.get('/', function(req, res){
    return res.redirect('/instructors')
})

routes.get('/instructors', function (req, res) {
    return res.render("instructors/index")
})

routes.get('/instructors/create', function (req, res) {
    return res.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)


//.post responsavel pela rota de pegar asiformações submetidas pelo formulario com method="POST"
routes.post('/instructors', instructors.post)

routes.put('/instructors', instructors.put)

routes.delete("/instructors", instructors.delete)

routes.get('/members', function (req, res) {
    return res.send("members")
})

module.exports = routes