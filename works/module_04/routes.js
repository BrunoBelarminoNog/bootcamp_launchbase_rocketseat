const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const instructors = require("./instructors")

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

//.post responsavel pela rota de pegar asiformações submetidas pelo formulario com method="POST"
routes.post('/instructors', instructors.post)

routes.get('/members', function (req, res) {
    return res.send("members")
})

module.exports = routes