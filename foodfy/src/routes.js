const express = require('express');
const routes = express.Router();
const site = require("./app/controllers/site")
const admin = require("./app/controllers/admin")
const chefs = require("./app/controllers/chefs")
const multer = require('./app/middlewares/multer')



//ROTAS PUBLICAS
routes.get('/', site.index)
routes.get('/sobre', site.about)
routes.get('/receitas', site.recipes)
routes.get("/receitas/:id", site.show)
routes.get('/chefs', site.chefs)



//ROTAS ADMIN RECIPES
routes.get("/admin/receitas", admin.index);
routes.get("/admin/receitas/create", admin.create);
routes.get("/admin/receitas/:id", admin.show);
routes.get("/admin/receitas/:id/edit", admin.edit);

routes.post("/admin/receitas", multer.array("photos", 5), admin.post);
routes.put("/admin/receitas", multer.array("photos", 5), admin.put);
routes.delete("/admin/receitas", admin.delete);


//ROTAS ADMIN CHEFS
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit);


routes.post("/admin/chefs", multer.array("avatar", 1), chefs.post)
routes.put("/admin/chefs", multer.array("avatar", 1), chefs.put)
routes.delete("/admin/chefs", chefs.delete)




module.exports = routes