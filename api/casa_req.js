const express = require('express')
const app = express() // instantiate express
const router = express.Router()
const Casa = require('../db/casa')

app.use('/', router)

router.use(function (req, res, next) {
    next()
})

router.route(`/buscaCasa`)

    .post(function (req, res) {
        let body = {}
        req.body.municipio ? body.municipio = req.body.municipio :
        req.body.bairro ? body.bairro = req.body.bairro :
        console.log(body)
            Casa.find(body, function (error, casa) {
                if (error) {
                    res.send(error)
                }
                if (req.body.num_quartos) {
                    casa = casa.filter((ap) => {
                        return ap.num_quartos >= req.body.num_quartos
                    })
                }
                if (req.body.valor_aluguel) {
                    casa = casa.filter((ap) => {
                        return ap.valor_aluguel <= req.body.valor_aluguel
                    })
                }
                res.send(casa)
            })
    })

// Rotas que irão terminar em '/casas' - (servem tanto para: GET All & POST)
router.route(`/casas`)

    // Método: Adicionar DOC na collection (acessar em: POST http://localhost:8000/casas
    .post(function (req, res) {
        const casa = new Casa({
            valor_aluguel: req.body.valor_aluguel,
            num_quartos: req.body.num_quartos,
            num_suites: req.body.num_suites,
            num_sala_estar: req.body.num_sala_estar,
            num_vagas_garagem: req.body.num_vagas_garagem,
            area: req.body.area,
            armario_embutido: req.body.armario_embutido,
            descricao: req.body.descricao,
            login_proprietario: req.body.login_proprietario,
            codigo: req.body.codigo,
            municipio: req.body.municipio,
            bairro: req.body.bairro,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            CEP: req.body.CEP
        })

        casa.save(function (error) {
            if (error)
                res.send(error)
            res.send({ message: 'Casa criado!' })
        })
    })

    // Método: Selecionar Todas (acessar em: GET http://locahost:8000/casas)
    .get(function (req, res) {

        //Função para Selecionar Todas as 'casas' e verificar se há algum erro:
        Casa.find(function (error, casa) {
            if (error)
                res.send(error)
            res.send(casa)
        })
    })

// Rotas que irão terminar em '/casa' - GET, PUT, DELETE (by codigo)
router.route('/casa')

    // Método: Selecionar Por Código (acessar em: GET http://localhost:8080/casa)
    .get(function (req, res) {

        //Função para Selecionar Por Código e verificar se há algum erro:
        Casa.find({ codigo: req.body.codigo }, function (error, casa) {
            if (error)
                res.send(error)

            res.send(casa)
        })
    })

    // Método: Atualizar (acessar em: PUT http://localhost:8080/casa)
    .put(function (req, res) {

        Casa.find({ codigo: req.body.codigo }, function (error, casa) {
            if (error)
                res.send(error)

            casa.valor_aluguel = req.body.valor_aluguel
            casa.num_quartos = req.body.num_quartos
            casa.num_suites = req.body.num_suites
            casa.num_sala_estar = req.body.num_sala_estar
            casa.num_vagas_garagem = req.body.num_vagas_garagem
            casa.area = req.body.area
            casa.armario_embutido = req.body.armario_embutido
            casa.descricao = req.body.descricao
            casa.login_proprietario = req.body.login_proprietario
            casa.codigo = req.body.codigo
            casa.municipio = req.body.municipio
            casa.bairro = req.body.bairro
            casa.logradouro = req.body.logradouro
            casa.numero = req.body.numero
            casa.complemento = req.body.complemento
            casa.CEP = req.body.CEP

            casa.save(function (error) {
                if (error)
                    res.send(error)

                res.send({ message: 'Casa Atualizada!' })
            })
        })
    })

    // Método: Excluir (acessar em: http://localhost:8000/casa)
    .delete(function (req, res) {

        //Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
        Casa.remove({ codigo: req.body.codigo }, function (error) {
            if (error)
                res.send(error)

            res.send({ message: 'Casa excluída com sucesso!' })
        })
    })

router.route(`/casa/user`)

    // Método: Selecionar Por Login (acessar em: GET http://localhost:8000/casa/user)
    .post(function (req, res) {
        
        // Busca as casas que o proprietário oferece através do Login
        Casa.find({ login_proprietario: req.body.login_proprietario }, function (error, casa) {
            if (error)
                res.send(error)

            res.send(casa)
        })
    })

module.exports = router