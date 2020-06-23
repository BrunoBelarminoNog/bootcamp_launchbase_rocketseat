const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const recipes = require("./data")


server.use(express.static('public'))

server.set('view engine', 'html')


nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {
    res.render("index", {items: recipes})
})

server.get('/sobre', (req, res) => {
    res.render("about")
})

server.get('/receitas', (req, res) => {
    res.render("recipes", {items : recipes})
})

server.get("/receitas/:index", (req, res) => {
    const recipeIndex = req.params.index;
    const recipe = recipes.find( function (recipe) {
        if (recipes[recipeIndex]) {
            true
        }
    })

    if (!recipes[recipeIndex]) {
        res.send('Recipe nof found') 
    }

    res.render("recipe", {item : recipes[recipeIndex]})
})

server.listen(5000, () => {
    console.log('server is ruuning')
})