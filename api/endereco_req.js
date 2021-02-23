const express = require('express')
const app = express() // instantiate express
const router = express.Router()
const Endereco = require('../db/endereco')

app.use('/', router)

router.use(function (req, res, next) {
    next()
})

/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/) */
router.get('/', function (req, res) {
    res.send({ message: 'Seja Bem-Vindo a nossa API' })
});

// Rotas que irão terminar em '/endereco' - (servem tanto para: GET All & POST)
router.route(`/endereco`)

    /* 1) Método: Atribuir doc na collection (acessar em: POST http://localhost:8000/endereco */
    .post(function (req, res) {
        console.log(req.body)
        const endereco = new Endereco({
            codigo: req.body.codigo,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            CEP: req.body.CEP,
            bairro: req.body.bairro,
            cidade: req.body.cidade
        })

        endereco.save(function (error) {
            if (error)
                res.send(error)
            res.send({ message: 'Endereço criado!' })
        });
    })

    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8000/endereco) */
    .get(function (req, res) {

        //Função para Selecionar Todos os 'enderecos' e verificar se há algum erro:
        Endereco.find(function (error, endereco) {
            if (error)
                res.send(error)
            res.send(endereco)
        })
    })

// Rotas que irão terminar em '/endereco/:codigo' - (GET by codigo, PUT, DELETE)
router.route('/endereco/:codigo')

    /* 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8080/endereco/:codigo) */
    .get(function (req, res) {
        console.log(req.params.codigo)
        //Função para Selecionar Por Id e verificar se há algum erro:
        Endereco.find({ codigo: req.params.codigo }, function (error, endereco) {
            if (error)
                res.send(error)

            res.send(endereco)
        })
    })

    /* 4) Método: Atualizar (acessar em: PUT http://localhost:8080/endereco/:codigo) */
    .put(function (req, res) {

        //Primeiro: Para atualizarmos, precisamos primeiro achar o endereco. Para isso, vamos selecionar por id:
        Endereco.find({ codigo: req.params.codigo }, function (error, endereco) {
            if (error)
                res.send(error)

            //Segundo: Diferente do Selecionar Por Id... a resposta será a atribuição do que encontramos na classe modelo:
            endereco.codigo = req.body.codigo
            endereco.logradouro = req.body.logradouro
            endereco.numero = req.body.numero
            endereco.complemento = req.body.complemento
            endereco.CEP = req.body.CEP
            endereco.bairro = req.body.bairro
            endereco.cidade = req.body.cidade

            //Terceiro: Salvando alteração...
            endereco.save(function (error) {
                if (error)
                    res.send(error)

                res.send({ message: 'Endereço Atualizado!' });
            })
        })
    })

    /* 5) Método: Excluir (acessar em: http://localhost:8080/enderecos/:codigo) */
    .delete(function (req, res) {

        //Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
        Endereco.remove({ codigo: req.params.codigo }, function (error) {
            if (error)
                res.send(error)

            res.send({ message: 'Endereço excluído!' })
        })
    })

module.exports = router