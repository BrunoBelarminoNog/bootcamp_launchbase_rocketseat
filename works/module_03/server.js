//1/npm init -y 
//cria o arquivo package.json

//2/npm install express
//cria a posta node_module e uma dependendia no arquivo pakage.json, a partir dai podemos chamar o pacote de servidor do express aqui no arquivo server.js:


const express = require('express') //3/
const nunjucks = require('nunjucks') //7/chamamos a requisão do nunjucks apos a instalação dele

const server = express() //3/

const videos = require("./data")

//10/configuramos o servidor para pegar os arquivos estaticos da pasta public
server.use(express.static('public'))

//8/confugurar o servidor para visualizar arquivos html
server.set('view engine', "njk")

//9/configuro o nunjucks para buscar os arquivos html na pasta views e roda-los no servidor aberto pelo express
nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

//4/na pagina inicial www......com.br/ iremos renderizar o arquivo index/about:
server.get("/", function (req, res) {
    const data = {
        avatar_url: "https://avatars1.githubusercontent.com/u/63688125?s=460&u=4c3fce443e96f10c7527999d33bf41abb4bf7a05&v=4",
        name: "Bruno Belarmino",
        role: "Estudante de programação",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Maxime cum quo nam corporis deserunt illo dolorum ipsum consectetur labore!Repellendus deleniti quae natus iure blanditiis ad odio commodi harum ducimusp",
        links: [
            {
                name: "Github",
                url: "https://github.com/BrunoBelarminoNog"
            },
            {
                name: "Twitter",
                url: "https://twitter.com/brun0belarmin0" },
            {
                name: "LinkdIn",
                url: "https://www.linkedin.com/in/bruno-belarmino-nog/"
            }
        ]
    }

    return res.render("about", { about: data })
})

server.get("/aulas", function (req, res) {
    return res.render("classes", { items: videos }) 
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        if (video.id == id){
            return true
        }
    })

    if(!video){
        return res.send("Video nao encontrado")
    }
    
    return res.render("video", {item: video})
})

//4/configuramos o servidor para escutar a porta 5000 
server.listen(5000, function () {
    console.log("server is running")
}) 

//npm start
//inicia o servidor

//crtl + C 
//desliga o servidor


//5/npm install -D nodemon
//reinicia o servidor automaticamente para melhor desenvolvimento
//no arquivo pakage.json cria uma nova dependencia de desenvolvimento, e DEVEMOS incluir no atributo "scripts"."start" a palavra nodemon antes da seclaração do arquivo server.js. FICANDO ASSIM: "start": "nodemon server.js"

//Na pasta views: arquivos html

//6/npm install nunjucks
//antes de instalar o nunjucks temos q parar o servidor, e então rodamos o comando no terminal.
//O nunjucks é um template engine, um motor que podemos fazer reuso de codigos, criar algumas lógicas no codigo para apresentar um pag ou outra, etc 
