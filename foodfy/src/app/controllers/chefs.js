const Chefs = require('../models/Chefs')
const Recipes = require('../models/Recipes')

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
    }
}   