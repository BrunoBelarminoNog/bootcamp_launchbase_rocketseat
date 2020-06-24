const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas

routes.get('/', function(req, res){
    return res.redirect('/instructors')
})

routes.get('/instructors', function (req, res) {
    return res.render("instructors/index")
})

routes.get('/members', function (req, res) {
    return res.send("members")
})

module.exports = routes