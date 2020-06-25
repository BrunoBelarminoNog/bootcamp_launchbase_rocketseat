const fs = require('fs')
const data = require("./data.json")

//post
exports.post = function (req, res) {
         //req.body -> requirimento para os itens submetidos no body

         //metodo para validar que todos os campos do formularios estão preenchidos:
         const keys = Object.keys(req.body) //retorna na forma de um array as chaves do objeto(que sao os names dos inputs) gerado na requisição 

         for (key of keys) {
             //com os names dos inputs recuperados na variavel keys, uso um looping para percorrer cada chave do req.body veirificando se estao preenchidas ou nao
             //req.body.key == ""
             if (req.body[key] == "")
                 return res.send('Please, fill all fields')

         }

         req.body.birth = Date.parse(req.body.birth) //transforma o atributo de data de nascimento no esquema padrao de ms desde 1970
         req.body.created_at = Date.now() //cria o atributo de data de criação
         req.body.id = Number(data.instructors.length + 1) //criando o id e seu incremento a cada push

         const {avatar_url, birth, created_at, id, name, services, gender} = req.body

         data.instructors.push({
             id,
             avatar_url,
             name,
             birth,
             gender,
             services,
             created_at
         }) 

         fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
             if(err) return res.send('Write file error.')

             return res.redirect("/instructors")
         })

       //  return res.send(req.body)
     }


//update


//delete