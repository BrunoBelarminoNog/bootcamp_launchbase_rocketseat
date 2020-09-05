const Chefs = require("../models/Chefs");
const Recipes = require('../models/Recipes')
const File = require('../models/File');
const { promises } = require("fs");

module.exports = {
    async index(req, res) {

        let results = await Recipes.all()
        let recipes = results.rows

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


        res.render("./admin/recipes/index", {
            recipes: allSet
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

        results = await Recipes.files(recipe.id);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));


        return res.render("./admin/recipes/show", {
            item: recipe,
            chef,
            files
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

        results = await Recipes.files(foundRecipe.id);
        let files = results.rows;
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));


        return res.render("./admin/recipes/edit", {
            item: foundRecipe,
            chefs,
            files
        })
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") return res.send("Please, fill all fields!")
        }

        if (req.files.length == 0) {
            return res.send('Please, send at least one image!')
        }

        const result = await Recipes.create(req.body)
        const recipe_id = result.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file, recipe_id}))
        await Promise.all(filesPromise)
        
        return res.redirect(`/admin/receitas/${recipe_id}`)

    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (key == "") {
                return res.send('Please, fill all fields!')
            }
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))
            await Promise.all(removedFilesPromise)
        }

        if (req.files.length != 0) {
            const oldFiles = await Recipes.files(req.body.id);
            const totalFiles = oldFiles.rows.length + req.files.length;

            if (totalFiles <= 5) {
                const newFilesPromise = req.files.map(file =>
                    File.create({
                        ...file,
                        recipe_id: req.body.id
                    }));

                await Promise.all(newFilesPromise);
            }
        }

        await Recipes.update(req.body)

        return res.redirect(`/admin/receitas/${req.body.id}`)

    },
    async delete(req, res) {
        const {
            id
        } = req.body


        const results = await Recipes.filesId(id)
        const files = results.rows

        for (file of files) {
            await File.delete(file.file_id)
        }

        await Recipes.delete(id)

        return res.redirect("/admin/receitas")
    }

}