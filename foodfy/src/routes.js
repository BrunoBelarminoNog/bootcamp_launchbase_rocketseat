const express = require('express');
const routes = express.Router();
const site = require("./app/controllers/site")
const admin = require("./app/controllers/admin")
const chefs = require("./app/controllers/chefs")


//ROTAS PUBLICAS
routes.get('/', site.index)
routes.get('/sobre', site.about)
routes.get('/receitas', site.recipes)
routes.get("/receitas/:index", site.show)

//ROTAS ADMIN RECIPES
routes.get("/admin/receitas", admin.index);
routes.get("/admin/receitas/create", admin.create);
routes.get("/admin/receitas/:id", admin.show);
routes.get("/admin/receitas/:id/edit", admin.edit);

routes.post("/admin/receitas", admin.post);
/*
routes.put("/admin/receitas", admin.put);
routes.delete("/admin/receitas", admin.delete);*/

//ROTAS ADMIN CHEFS
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show)

routes.post("/admin/chefs", chefs.post)

module.exports = routes