const recipes = require("../../../data")


module.exports = {
    index(req, res) {
        res.render("./recipes/index", {
            items: recipes
        })
    },
    about(req, res) {
        res.render("./recipes/about")
    },
    recipes(req, res) {
         res.render("./recipes/recipes", {
             items: recipes
         })
    },
    show(req, res) {
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
    }
}