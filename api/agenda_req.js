const express = require('express')
const Agenda = require('../db/agenda')
const app = express() // instantiate express
const router = express.Router()

app.use('/', router)

router.use(function (req, res, next) {
    next()
})

router.route(`/agendar`)
    // Método: Adicionar DOC na collection (acessar em: POST http://localhost:8000/agenda
    .post(function (req, res) {
        const agenda = new Agenda({
            data: req.body.data,
            codigo_imovel: req.body.codigo_imovel,
            nome: req.body.nome,
            CPF: req.body.CPF,
            telefone: req.body.telefone
        })

        agenda.save(function (error) {
            if (error)
                res.send(error)
            res.send({ message: 'Visita Agendada!' })
        })
    })

    // Método: Selecionar Todos (acessar em: GET http://locahost:8000/agenda)
    .get(function (req, res) {
        // Função para Selecionar Todos os agendamentos e verificar se há algum erro:
        Agenda.find(function (error, agenda) {
            if (error)
                res.send(error)
            res.send(agenda)
        })
    })

router.route(`/agendamentos`) // Acessar agendamentos marcados em uma determinada data
    .post(function (req, res) {
        Agenda.find({ codigo_imovel: req.body.codigo_imovel }, function (error, agenda) {
            if (error)
                res.send(error)
            res.send(agenda)
        })
    })

module.exports = router