const express = require('express')
const app = express() // instantiate express
const router = express.Router()
const Usuario = require('../db/usuario')

app.use('/', router)

router.use(function (req, res, next) {
    next()
})

// Verifica login-senha
router.route(`/login`)
    .post(function (req, res) {
        Usuario.find({ login: req.body.login, senha: req.body.senha }, function (error, usuario) {
            if (error)
                res.send(error)
            res.send(usuario[0])
        })
    })

// Rotas que irão terminar em '/usuario' - (servem tanto para: GET All & POST)
router.route(`/usuario`)

    /* 1) Método: Atribuir doc na collection (acessar em: POST http://localhost:8000/usuario */
    .post(function (req, res) {

        const usuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            login: req.body.login,
            senha: req.body.senha,
            telefone: req.body.telefone
        })

        usuario.save(function (error) {
            if (error)
                res.send(error)
            res.send({ message: 'Usuário criado!' })
        })
    })

    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8000/usuario) */
    .get(function (req, res) {

        //Função para Selecionar Todos os 'usuarios' e verificar se há algum erro:
        Usuario.find(function (error, usuario) {
            if (error)
                res.send(error)
            res.send(usuario)
        })
    })

// Rotas que irão terminar em '/usuario/:codigo' - (GET by codigo, PUT, DELETE)
router.route('/usuario/:codigo')

    /* 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8080/usuario/:codigo) */
    .get(function (req, res) {

        //Função para Selecionar Por Id e verificar se há algum erro:
        Usuario.find({ login: req.body.login }, function (error, usuario) {
            if (error)
                res.send(error)

            res.send(usuario)
        })
    })

    /* 4) Método: Atualizar (acessar em: PUT http://localhost:8080/usuario/:codigo) */
    .put(function (req, res) {

        //Primeiro: Para atualizarmos, precisamos primeiro achar o usuario. Para isso, vamos selecionar por id:
        Usuario.find({ login: req.body.login }, function (error, usuario) {
            if (error)
                res.send(error)

            //Segundo: Diferente do Selecionar Por Id... a resposta será a atribuição do que encontramos na classe modelo:
            usuario.nome = req.body.nome
            usuario.email = req.body.email
            usuario.login = req.body.login
            usuario.senha = req.body.senha
            usuario.telefone = req.body.telefone

            //Terceiro: Salvando alteração...
            usuario.save(function (error) {
                if (error)
                    res.send(error)

                res.send({ message: 'Usuario Atualizado!' });
            })
        })
    })

    /* 5) Método: Excluir (acessar em: http://localhost:8080/usuarios/:codigo) */
    .delete(function (req, res) {

        //Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
        Usuario.remove({ login: req.body.login }, function (error) {
            if (error)
                res.send(error)

            res.send({ message: 'Usuario excluído!' })
        })
    })

module.exports = router