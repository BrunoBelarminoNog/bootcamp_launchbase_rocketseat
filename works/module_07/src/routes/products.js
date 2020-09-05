const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const multer = require('../app/middlewares/multer')

const Searchcontroller = require('../app/controllers/searchController')
const Productcontroller = require('../app/controllers/productcontroller')


//SEARCH
routes.get('/search', Searchcontroller.index)

//PRODUCTS
routes.get('/create', Productcontroller.create)
routes.get("/:id", Productcontroller.show)
routes.get('/:id/edit', Productcontroller.edit)

routes.post('/', multer.array("photos", 6), Productcontroller.post)
routes.put('/', multer.array("photos", 6), Productcontroller.put)
routes.delete('/', Productcontroller.delete)

module.exports = routes
