const fs = require("fs");
const recipes = require("../data")
const data = require("../data.json")


exports.index = function (req, res) {
    res.render("./admin/index", {items: data.recipes})
}

exports.show = function (req, res) {
    const {id} = req.params

    const foundRecipe = data.recipes.find( function (recipe) {
        if (recipe.id == id) {
            return true
        }
    })
    if (!foundRecipe) {
        return res.send("Receita não encontrada")
    }

    return res.render("./admin/show", {item : foundRecipe})
}


exports.create = function (req, res) {
    res.render("./admin/create")
}

exports.edit = function (req, res) {
    const {id} = req.params

    const foundRecipe = data.recipes.find(function (recipe) {
        if (recipe.id == id)
        return true
    })

    if(!foundRecipe) {
        return res.send("Receita não encontrada")
    }

    return res.render("./admin/edit", {item : foundRecipe})
}


exports.post = function (req, res) {
   
    console.log(req.body)
    
   let id = 1;

   const lastRecipe = data.recipes[data.recipes.length - 1]
   if (lastRecipe){
       id = lastRecipe.id + 1
   }


   data.recipes.push({
      ...req.body,
      id
   })

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
       if (err) return res.send('Write file error.')

       return res.redirect("/admin/receitas")
   })

}

exports.put = function (req, res) {
    
    const {id} = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function (recipe, indexFound) {
        if( recipe.id == id){
            index = indexFound
            return true
        }
    })

    if(!foundRecipe){
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
}

exports.delete = function (req, res) {
    const {id} = req.body

    const filteredRecipes = data.recipes.filter(function (recipe) {
        if(recipe.id != id) {
            return true
        }
    })

    data.recipes = filteredRecipes;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) {
            return res.send("Erro na gravação dos dados")
        }

        return res.redirect("/admin/receitas")

    })

}