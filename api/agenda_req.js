const express = require("express");
const Agenda = require("../db/agenda");
const app = express(); // instantiate express
const router = express.Router();

app.use("/", router);

router.use(function (req, res, next) {
  next();
});

router
  .route(`/agendar`)
  // Método: Adicionar DOC na collection (acessar em: POST http://localhost:8000/agenda
  .get(function (req, res) {
    // Função para Selecionar Todos os agendamentos e verificar se há algum erro:
    Agenda.find(function (error, agenda) {
      if (error) res.send(error);
      res.send(agenda);
    });
  })
  .post(function (req, res) {
    const agenda = new Agenda({
      data: req.body.data,
      codigo_imovel: req.body.codigo_imovel,
      nome: req.body.nome,
      CPF: req.body.CPF,
      telefone: req.body.telefone,
    });

    agenda.save(function (error) {
      if (error) res.send(error);
      res.send({ message: "Visita Agendada!" });
    });
  })
  .delete(function (req, res) {
    // Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
    Agenda.deleteOne({ _id: req.query.codigo }, function (error) {
      message = "Agendamento excluído com sucesso!";
      if (error) message = "Deu merda";
      res.send({ message: message });
    });
  });

router
  .route(`/agendamentos`) // Acessar agendamentos marcados em uma determinada data
  .post(function (req, res) {
    Agenda.find(
      { codigo_imovel: req.body.codigo_imovel },
      function (error, agenda) {
        if (error) res.send(error);
        res.send(agenda);
      }
    );
  });

module.exports = router;
