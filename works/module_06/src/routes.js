const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const multer = require('./app/middlewares/multer')
const Productcontroller = require('./app/controllers/productcontroller')


routes.get('/', function(req, res){
    return res.render("layout.njk")
})

routes.get('/products/create', Productcontroller.create)
routes.get('/products/:id/edit', Productcontroller.edit)

routes.post('/products', multer.array("photos", 6), Productcontroller.post)
routes.put('/products', multer.array("photos", 6), Productcontroller.put)
routes.delete('/products', Productcontroller.delete)


//Alias
routes.get('/ads/create', function (req, res) {
    return res.redirect("/products/create")
})
module.exports = routes