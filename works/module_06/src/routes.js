const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const multer = require('./app/middlewares/multer')
const Productcontroller = require('./app/controllers/productcontroller')
const Homecontroller = require('./app/controllers/homeController')
const Searchcontroller = require('./app/controllers/searchController')


//HOME
routes.get('/', Homecontroller.index)

//SEARCH
routes.get('/products/search', Searchcontroller.index)

//PRODUCTS
routes.get('/products/create', Productcontroller.create)
routes.get("/products/:id", Productcontroller.show)
routes.get('/products/:id/edit', Productcontroller.edit)

routes.post('/products', multer.array("photos", 6), Productcontroller.post)
routes.put('/products', multer.array("photos", 6), Productcontroller.put)
routes.delete('/products', Productcontroller.delete)

//ALIAS
routes.get('/ads/create', function (req, res) {
    return res.redirect("/products/create")
})


module.exports = routes