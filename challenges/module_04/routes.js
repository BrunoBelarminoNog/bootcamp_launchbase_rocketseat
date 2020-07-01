const express = require('express')
const routes = express.Router();
const teachers = require("./teachers")

routes.get('/', function (req, res) {
    res.redirect('/teachers')
})

routes.get('/teachers', function (req, res) {
    res.render('index')
})

routes.get('/teachers/create', function (req, res) {
    res.render('create')
})

routes.post("/teachers", teachers.post)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit)

module.exports = routes