const Chefs = require("../models/Chefs");
const Recipes = require('../models/Recipes')

module.exports = {
    async index(req, res) {

        let results = await Recipes.all()
        let recipes = results.rows

        for(recipe of recipes) {
            let result = await Chefs.findName(recipe.chef_id)
            let nameChef = result.rows[0]

            recipe.chef_id = nameChef.name
        }


        res.render("./admin/recipes/index", {
            recipes
        })
    },
    async create(req, res) {

        let results = await Recipes.chefSelectOptions()
        const options = results.rows

        res.render("./admin/recipes/create", {chefs: options})
    },
    async show(req, res) {
        const {
            id
        } = req.params

        let result = await Recipes.find(id)
        const recipe = result.rows[0]

        result = await Chefs.find(recipe.chef_id)
        const chef = result.rows[0].name

        if (!recipe) {
            return res.send("Receita não encontrada")
        }

        return res.render("./admin/recipes/show", {
            item: recipe, chef
        })
    },
    edit(req, res) {
        const {
            id
        } = req.params

        const foundRecipe = data.recipes.find(function (recipe) {
            if (recipe.id == id)
                return true
        })

        if (!foundRecipe) {
            return res.send("Receita não encontrada")
        }

        return res.render("./admin/recipes/edit", {
            item: foundRecipe
        })
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys){
            if(req.body[key] == "") return res.send("Please, fill all fields!")
        } 

        const result = await Recipes.create(req.body)
        const recipeId = result.rows[0].id

            return res.redirect(`/admin/receitas/${recipeId}`)

    }
    /*
    put(req, res) {
        const {
            id
        } = req.body
        let index = 0

        const foundRecipe = data.recipes.find(function (recipe, indexFound) {
            if (recipe.id == id) {
                index = indexFound
                return true
            }
        })

        if (!foundRecipe) {
            return res.send("Dados não encontrados")
        }

        const recipe = {
            ...foundRecipe,
            ...req.body,
            id: Number(req.body.id)
        }

        data.recipes[index] = recipe;

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) {
                return res.send("write error")
            }

            return res.redirect(`/admin/receitas/${id}`)
        })
    },
    delete(req, res) {
        const {
            id
        } = req.body

        const filteredRecipes = data.recipes.filter(function (recipe) {
            if (recipe.id != id) {
                return true
            }
        })

        data.recipes = filteredRecipes;

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) {
                return res.send("Erro na gravação dos dados")
            }

            return res.redirect("/admin/receitas")

        })
        
    }
    */

}