const express = require('express') 
const nunjucks = require('nunjucks') 
const routes = require("./routes")
const methodOverride = require('method-override') //para usar o method PUT no formulario da edição do instrutor
const session = require('./config/session')
const server = express() 


server.use(session)
server.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

server.use(express.urlencoded({extended: true})) //linha responsavel por ligar a requisação do formulario em body

server.use(express.static('public'))

server.use(methodOverride('_method')) //configuração para sobreescrever o metodo HTML GET ou POST para Delete ou PUT. Tem que sobreescrever ANTES de chamar a lista de rotas(server.use(routes))  

server.use(routes)


server.set('view engine', "njk")



nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false,
    noCache: true
})



server.listen(5000, function () {
    console.log("server is running")
}) 
