const User = require("../models/User")

const {hash} = require('bcryptjs')
const crypto = require('crypto') //modulo de criação de token já disponivel no node
const mailer = require('../../lib/mailer')


module.exports = {
    loginForm(req, res) {
        return res.render("session/login")
    },
    login(req, res) {
        //depois das validações colocar o usuario no req.session
        req.session.userId = req.user.id

        return res.redirect("/users")
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req, res) {
        return res.render("session/forgot-password")

    },
    async forgot(req, res) {
        try {

            const user = req.user

            //um token para esse usuario
            const token = crypto.randomBytes(20).toString("hex")

            //criar expiração
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            //enviar um email com um link de recuperação de senha
            //npm install nodemailer

            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de senha',
                html: `<h2>Perdeu a chave?</h2>
            <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
            <p>
                <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                    RECUPERAR SENHA
                </a>
            </p>
            `
            })

            //avisar o usuario que enviamos o email
            return res.render('session/forgot-password', {
                success: "Verifique seu e-mail para resetar sua senha!"
            })

            
        } catch (error) {
            console.error(error)

            return res.render("session/forgot-password", {
                error: "Erro inesperado"
            })
        }


    },
    resetForm(req, res) {
        return res.render("session/password-reset", {token: req.query.token})
    },
    async reset(req, res) {
        const {password, token} = req.body
        const user = req.user
        try {
            //cria um novo hash de senha
                const newPassword = await hash(password, 8)
            //atualiza o usuario
                await User.update(user.id, {
                    password: newPassword,
                    reset_token: "",
                    reset_token_expires: ""
                })
            //avisa o usuario que ele tem uma nova senha
                return res.render("session/login", {
                    user: req.body,
                    success: "Senha atualizada, faça seu login."
                })

        } catch (error) {
            console.error(error)
            return res.render("session/password-reset", {
                user: req.body,
                token,
                error: "Erro inesperado"
            })
        }
    }
}