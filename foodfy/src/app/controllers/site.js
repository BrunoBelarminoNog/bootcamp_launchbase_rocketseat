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

        async function getImage(recipeId) {
            let results = await Recipes.files(recipeId);
            const files = results.rows.map(file =>
                `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            );

            return files[0];
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        });

        const allSet = await Promise.all(recipesPromise);

        return res.render("./site/index", {
            items: allSet
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

        async function getImage(recipeId) {
            let results = await Recipes.files(recipeId);
            const files = results.rows.map(file =>
                `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            );

            return files[0];
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        });

        const allSet = await Promise.all(recipesPromise);

        return res.render("./site/recipes", {
            items: allSet
        })
    },
    async show(req, res) {
        let result = await Recipes.find(req.params.id)
        let recipe = result.rows[0]

        if (!recipe) return res.send("Recipe not found!")

        result = await Chefs.findName(recipe.chef_id)
        const chefName = result.rows[0].name

        recipe.chef_id = chefName

        results = await Recipes.files(recipe.id);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        return res.render("./site/recipe", {
            item: recipe,
            files
        })
    },
    async chefs(req, res) {
        let results = await Chefs.all()
        let chefs = results.rows

        for (chef of chefs) {

            results = await Chefs.files(chef.file_id)
            const file = results.rows[0]

            chef.file_id = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }

        return res.render("./site/chefs", {
            chefs
        })
    }
}