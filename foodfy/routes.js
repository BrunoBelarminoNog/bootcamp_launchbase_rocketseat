const express = require('express');
const routes = express.Router();
const recipes = require("./data")
const admin = require("./controllers/admin")


//ROTAS PUBLICAS
routes.get('/', (req, res) => {
    res.render("./recipes/index", {
        items: recipes
    })
})
routes.get('/sobre', (req, res) => {
    res.render("./recipes/about")
})
routes.get('/receitas', (req, res) => {
    res.render("./recipes/recipes", {
        items: recipes
    })
})
routes.get("/receitas/:index", (req, res) => {
    const recipeIndex = req.params.index;
    const recipe = recipes.find(function (recipe) {
        if (recipes[recipeIndex]) {
            true
        }
    })

    if (!recipes[recipeIndex]) {
        res.send('Recipe nof found')
    }

    res.render("./recipes/recipe", {
        item: recipes[recipeIndex]
    })
})

//ROTAS ADMIN
routes.get("/admin/receitas", admin.index);
routes.get("/admin/receitas/create", admin.create);
routes.get("/admin/receitas/:id", admin.show);
routes.get("/admin/receitas/:id/edit", admin.edit);

routes.post("/admin/receitas", admin.post);
routes.put("/admin/receitas", admin.put);
routes.delete("/admin/receitas", admin.delete);


module.exports = routes