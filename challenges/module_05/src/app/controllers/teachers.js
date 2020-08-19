const Teachers = require("../models/teacher")
const { age, grau, aula, date } = require("../../lib/utils")

module.exports = {
    index(req, res) {
        Teachers.all(function (teachers) {
        res.render('index', {teachers})
        })
    },
    post(req, res) {
         const keys = Object.keys(req.body)

         for (key of keys) {
             if (req.body[key] == '') {
                 res.send("Por favor preencher todos os campos")
             }
         }
         console.log(req.body)

         Teachers.create(req.body, function (teacher) {
             return res.redirect(`/teachers/${teacher.id}`)
         })
         
    },
    show(req, res) {

        Teachers.find(req.params.id, function (teacher) {
            if (!teacher) return res.send('Professor não encontrado')

            teacher.age = `${age(teacher.birth)} anos`
            teacher.schooling = grau(teacher.schooling)
            teacher.areas = teacher.areas.split(",")
            teacher.created_at = date(teacher.created_at).data
            teacher.type = aula(teacher.type)

            return res.render("show", {teacher})
        })
    },
    edit(req, res) {
        return res.render("show")
    },
    put(req, res) {
         return res.redirect(`/teachers/${id}`)
    },
    delete(req, res) {
        return res.redirect("/teachers")
    }

}
/*
exports.index = function (req, res) {
}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys){
        if(req.body[key] == ''){
            res.send("Por favor preencher todos os campos")
        }
    }
    console.log(req.body)

    let id = 1
    const lastTeacher = data.teachers[data.teachers.length - 1]
    if (lastTeacher) {
        id = lastTeacher.id + 1
    }

    const birth = Date.parse(req.body.birth) //transforma o atributo de data de nascimento no esquema padrao de ms desde 1970
    const created_at = Date.now() //cria o atributo de data de criação
    

    data.teachers.push({
        ...req.body,
        birth,
        id,
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

exports.put = function (req, res) {
    const {id} = req.body

    let index = 0

    const teacherFound = data.teachers.find(function (teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })
    if (!teacherFound) return res.send("Professor não encontrado")

    const teacher = {
        ...teacherFound,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

     fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
         if (err) {
             return res.send("write error")
         }

         return res.redirect(`/teachers/${id}`)
     })
}

exports.delete = function (req, res) {
    const {id} = req.body

    const filteredTeachers = data.teachers.filter(function (teacher) {
        return teacher.id != id
        //percorremos o array do data.teachers, se o teacher.id for DIFERENTE do id do req.body, retornará true e sera incluido no array filteredInstructors, caso seja o MESMO ID, retornará false e será FILTRADO/EXCLUIDO da incluisao desse array
    })

    data.teachers = filteredTeachers //com o array filtrado, atualizamos o data.teachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!")
    })

    return res.redirect("/teachers")
}*/