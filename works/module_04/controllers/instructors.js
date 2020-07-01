const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../utils')


//index
exports.index = function (req, res) {
    return res.render('instructors/index', {instructors: data.instructors})
}

//show
exports.show = function (req, res) {
    const {id} = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if(!foundInstructor) return res.send('Instructor not found.')

    
    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("en-GB").format(foundInstructor.created_at),
    }
    return res.render('instructors/show', {instructor})
}

//create
exports.create = function (req, res) {
    return res.render('instructors/create')
}

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

//edit
exports.edit = function (req, res) {
     const {id} = req.params

     const foundInstructor = data.instructors.find(function (instructor) {
         return instructor.id == id
     })

     if (!foundInstructor) return res.send('Instructor not found.')


     const instructor = {
         ...foundInstructor,
     birth: date(foundInstructor.birth).iso
     }

    
    return res.render('instructors/edit', { instructor })
}


//put 
exports.put = function (req, res) {
    const {id} = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (id == instructor.id){
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send('Instructor not found.')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id) //construtor number que transforma string em numero
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) {
            return res.send("write error")
        }

        return res.redirect(`/instructors/${id}`)
    })
}

//delete
exports.delete = function (req, res) {
    const {id} = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
        //percorremos o array do data.instructors, se o instructor.id for DIFERENTE do id do req.body, retornará true e sera incluido no array filteredInstructors, caso seja o MESMO ID, retornará false e será FILTRADO/EXCLUIDO da incluisao desse array
    })

    data.instructors = filteredInstructors //com o array filtrado, atualizamos o data.instructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!")
    })

    return res.redirect("/instructors")
}