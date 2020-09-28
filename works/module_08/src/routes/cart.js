const express = require('express');
const routes = express.Router(); //Router() é o metodo responsavel para que a variavel responda pelas rotas

const CartController = require('../app/controllers/CartController')



routes.get('/', CartController.index)
routes.post('/:id/add-one', CartController.addOne)
routes.post('/:id/remove-one', CartController.removeOne)
routes.post('/:id/delete-one', CartController.delete)




module.exports = routes
