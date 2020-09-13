const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas
const multer = require('../app/middlewares/multer')

const Searchcontroller = require('../app/controllers/searchController')
const Productcontroller = require('../app/controllers/productcontroller')

const {onlyUsers} = require('../app/middlewares/session')

//SEARCH
routes.get('/search', Searchcontroller.index)

//PRODUCTS
routes.get('/create', onlyUsers, Productcontroller.create)
routes.get("/:id", Productcontroller.show)
routes.get('/:id/edit', onlyUsers, Productcontroller.edit)

routes.post('/', onlyUsers, multer.array("photos", 6), Productcontroller.post)
routes.put('/', onlyUsers, multer.array("photos", 6), Productcontroller.put)
routes.delete('/', onlyUsers, Productcontroller.delete)

module.exports = routes
