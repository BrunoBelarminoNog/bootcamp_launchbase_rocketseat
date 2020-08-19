const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override') //para usar o method PUT no formulario da edição do instrutor
const server = express();


server.use(express.urlencoded({
    extended: true
})) //linha responsavel por ligar a requisação do formulario em body

server.use(express.static('public'))

server.use(methodOverride('_method')) //configuração para sobreescrever o metodo HTML GET ou POST para Delete ou PUT. Tem que sobreescrever ANTES de chamar a lista de rotas(server.use(routes))  
server.use(routes)


server.set('view engine', 'njk')

nunjucks.configure('src/app/views',{
    express: server,
    noCache: true,
    autoescape: false
})


server.listen(3000, function () {
    console.log('server is running')
})