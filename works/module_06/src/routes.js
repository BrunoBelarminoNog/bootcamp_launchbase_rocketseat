const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const Productcontroller = require('./app/controllers/productcontroller')

routes.get('/', function(req, res){
    return res.render("layout.njk")
})

routes.get('/products/create', Productcontroller.create)
routes.get('/products/:id/edit', Productcontroller.edit)

routes.post('/products', Productcontroller.post)
routes.put('/products', Productcontroller.put)
routes.delete('/products', Productcontroller.delete)


//Alias
routes.get('/ads/create', function (req, res) {
    return res.redirect("/products/create")
})
module.exports = routes