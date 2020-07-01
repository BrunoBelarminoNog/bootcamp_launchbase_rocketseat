const fs = require('fs')
const data = require("../data.json")
const { date } = require('../utils')


exports.index = function (req, res) {
    return res.render('members/index', {members: data.members})
}

exports.show = function (req, res) {
    const {id} = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if(!foundMember) return res.send('Member not found.')

    

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthday
    }
    return res.render('members/show', {member})
}

exports.create = function (req, res) {
        return res.render('members/create')
}

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

         //configuro a data de nascimento para a forma padrão
         birth = Date.parse(req.body.birth)
         
         //logica paraconstruir o id unico para cada membro
         let id = 1
         const lastMember = data.members[data.members.length - 1]
         if (lastMember){
             id = lastMember.id + 1
         }

         //incluo os dados no data.js realizando um push dos dados desestruturados vindo do req.body, e atualizando o que configuramos (id, birth)
         data.members.push({
             ...req.body,
             id,
             birth,
         }) 

         fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
             if(err) return res.send('Write file error.')

             return res.redirect("/members/" + id)
         })

     }

exports.edit = function (req, res) {
     const {id} = req.params

     const foundMember = data.members.find(function (member) {
         return member.id == id
     })

     if (!foundMember) return res.send('Member not found.')


     const member = {
         ...foundMember,
     birth: date(foundMember.birth).iso
     }

    
    return res.render('members/edit', { member })
}

exports.put = function (req, res) {
    const {id} = req.body
    let index = 0

    const foundMember = data.members.find(function (member, foundIndex) {
        if (id == member.id){
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('Member not found.')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id) //construtor number que transforma string em numero
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if(err) {
            return res.send("write error")
        }

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function (req, res) {
    const {id} = req.body

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
        //percorremos o array do data.members, se o member.id for DIFERENTE do id do req.body, retornará true e sera incluido no array filteredMembers, caso seja o MESMO ID, retornará false e será FILTRADO/EXCLUIDO da incluisao desse array
    })

    data.members = filteredMembers //com o array filtrado, atualizamos o data.members

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!")
    })

    return res.redirect("/members")
}