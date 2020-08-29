const Chefs = require("../models/Chefs")
const Recipes = require("../models/Recipes")


module.exports = {
    async index(req, res) {

        let results = await Recipes.all()
        const recipes = results.rows

        for (recipe of recipes) {
            let result = await Chefs.findName(recipe.chef_id)
            let nameChef = result.rows[0]

            recipe.chef_id = nameChef.name
        }

        return res.render("./site/index", {
            items: recipes
        })
    },
    about(req, res) {
        return res.render("./site/about")
    },
    async recipes(req, res) {
        const {
            filter
        } = req.query

        if (filter) {
            let results = await Recipes.findBy(filter);
            const recipes = results.rows

            for (recipe of recipes) {
                let result = await Chefs.findName(recipe.chef_id)
                let nameChef = result.rows[0]

                recipe.chef_id = nameChef.name
            }

            return res.render("./site/recipes", {items: recipes, filter})
        }

        let results = await Recipes.all()
        const recipes = results.rows

        for (recipe of recipes) {
            let result = await Chefs.findName(recipe.chef_id)
            let nameChef = result.rows[0]

            recipe.chef_id = nameChef.name
        }

        return res.render("./site/recipes", {
            items: recipes
        })
    },
    async show(req, res) {
        let result = await Recipes.find(req.params.id)
        let recipe = result.rows[0]

        if (!recipe) return res.send("Recipe not found!")

        result = await Chefs.findName(recipe.chef_id)
        const chefName = result.rows[0].name

        recipe.chef_id = chefName

        return res.render("./site/recipe", {
            item: recipe
        })
    },
    async chefs(req, res) {
        const results = await Chefs.all()
        const chefs = results.rows

        return res.render("./site/chefs", {
            chefs
        })
    }
}