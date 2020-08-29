const Chefs = require("../models/Chefs");
const Recipes = require('../models/Recipes')

module.exports = {
    async index(req, res) {

        let results = await Recipes.all()
        let recipes = results.rows

        for (recipe of recipes) {
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

        res.render("./admin/recipes/create", {
            chefs: options
        })
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
            item: recipe,
            chef
        })
    },
    async edit(req, res) {
        const {
            id
        } = req.params

        let results = await Recipes.find(id)
        const foundRecipe = results.rows[0]

        if (!foundRecipe) {
            return res.send("Receita não encontrada")
        }

        results = await Recipes.chefSelectOptions()
        const chefs = results.rows


        return res.render("./admin/recipes/edit", {
            item: foundRecipe,
            chefs
        })
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") return res.send("Please, fill all fields!")
        }

        const result = await Recipes.create(req.body)
        const recipeId = result.rows[0].id

        return res.redirect(`/admin/receitas/${recipeId}`)

    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (key == "") {
                return res.send('Please, fill all fields!')
            }
        }

        await Recipes.update(req.body)

        return res.redirect(`/admin/receitas/${req.body.id}`)

    },
    async delete(req, res) {
        const {
            id
        } = req.body

        await Recipes.delete(id)

        return res.redirect("/admin/receitas")

    }

}