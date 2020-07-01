const fs = require('fs');
const data = require("./data.json");
const { age, grau, aula, date } = require("./utils")

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys){
        if(req.body[key] == ''){
            res.send("Por favor preencher todos os campos")
        }
    }
    console.log(req.body)

    req.body.birth = Date.parse(req.body.birth) //transforma o atributo de data de nascimento no esquema padrao de ms desde 1970
    req.body.created_at = Date.now() //cria o atributo de data de criação
    req.body.id = Number(data.teachers.length + 1) //criando o id e seu incremento a cada push

    const {
        id,
        avatar_url,
        name,
        birth,
        type,
        schooling,
        areas,
        created_at
    } = req.body

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        type,
        schooling,
        areas,
        created_at
    })



    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('Write file error.')

        return res.redirect("/teachers")
    })
}


exports.show = function (req, res) {
    const {id} = req.params

    const teacherFound = data.teachers.find( function (teacher) {
        return teacher.id == id
    })
    if(!teacherFound) return res.send("Professor não encontrado")

    
    

    const teacher = {
        ...teacherFound,
        age: `${age(teacherFound.birth)} anos`,
        areas: teacherFound.areas.split(","),
        schooling: grau(teacherFound.schooling),
        type: aula(teacherFound.type),
        created_at: new Intl.DateTimeFormat("en-BR").format(teacherFound.created_at),
    }
    
    return res.render("show", {teacher})
}

exports.edit = function (req, res) {
     const {
         id
     } = req.params


     let teacherFound = data.teachers.find(function (teacher) {
         return teacher.id == id
     })
     if (!teacherFound) return res.send("Professor não encontrado")


    const teacher = {
        ...teacherFound,
        birth: date(teacherFound.birth).iso
    }

    return res.render("edit", {teacher})
}