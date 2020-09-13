const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas

const Homecontroller = require('../app/controllers/homeController')

const users = require('./users')
const products = require('./products')


routes.get('/', Homecontroller.index)
routes.use('/products', products)
routes.use('/users', users) //.u    se funciona como um midleware, colocando a rota /users no inicio de cada rota importada do arquivo users.js


//ALIAS
routes.get('/ads/create', function (req, res) {
    return res.redirect("/products/create")
})
routes.get('/accounts', function (req, res) {
    return res.redirect("users/login")
})


module.exports = routes