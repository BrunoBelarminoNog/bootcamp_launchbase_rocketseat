const Chefs = require('../models/Chefs')
const Recipes = require('../models/Recipes')
const { edit } = require('./admin')

module.exports = {
    async index(req, res) {
        const results = await Chefs.all()
        const chefs = results.rows

        if(!chefs) return res.send("Database error!")

        return res.render("admin/chefs/index", {chefs})
    },
    create(req, res) {
        res.render("./admin/chefs/create")
    },
    async show(req, res){
        let results = await Chefs.find(req.params.id);
        const chef = results.rows[0];

        if (!chef) return res.send("Chef not found!")

        results = await Recipes.chefRecipes(chef.id)
        const recipes = results.rows

        if(!recipes) return `Este chef não possui nenhuma receita cadastrada`

        return res.render("admin/chefs/show", {chef, recipes})

    },
    async edit(req, res) {
        const {id} = req.params

        let result = await Chefs.find(id)
        const chef = result.rows[0]

        return res.render("./admin/chefs/edit", {chef})
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if( req.body[key] == ""){
                res.send("Please, fill all fields!")
            }
        }

        let results = await Chefs.create(req.body)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (key == "") {
                return res.send("Please, fill all fields!")
            }
        }

        await Chefs.update(req.body)

        return res.redirect(`/admin/chefs/${req.body.id}`)
    },
    async delete(req, res) {
        const {id} = req.body

        await Chefs.delete(id)

        return res.redirect("/admin/chefs")
    }
}   