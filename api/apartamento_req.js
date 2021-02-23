const express = require("express");
const Apartamento = require("../db/apartamento");
const app = express(); // instantiate express
const router = express.Router();

app.use("/", router);

router.use(function (req, res, next) {
  next();
});

/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/) */
router.get("/", function (req, res) {
  res.send({ message: "Seja Bem-Vindo a nossa API" });
});

router
  .route(`/buscaApartamento`)

  .post(function (req, res) {
    let body = {};
    req.body.municipio ? (body.municipio = req.body.municipio) : "";
    req.body.bairro ? (body.bairro = req.body.bairro) : "";
    Apartamento.find(body, function (error, apartamento) {
      if (error) {
        res.send(error);
      }
      if (req.body.num_quartos) {
        apartamento = apartamento.filter((ap) => {
          return ap.num_quartos >= req.body.num_quartos;
        });
      }
      if (req.body.valor_aluguel) {
        apartamento = apartamento.filter((ap) => {
          return ap.valor_aluguel <= req.body.valor_aluguel;
        });
      }
      res.send(apartamento);
    });
  });

// Rotas que irão terminar em '/apartamentos' - (servem tanto para: GET All & POST)
router
  .route(`/apartamentos`)

  // Método: Adicionar DOC na collection (acessar em: POST http://localhost:8000/apartamentos)
  .post(function (req, res) {
    const apartamento = new Apartamento({
      valor_aluguel: req.body.valor_aluguel,
      num_quartos: req.body.num_quartos,
      num_suites: req.body.num_suites,
      num_sala_estar: req.body.num_sala_estar,
      num_vagas_garagem: req.body.num_vagas_garagem,
      area: req.body.area,
      armario_embutido: req.body.armario_embutido,
      descricao: req.body.descricao,
      condominio: req.body.condominio,
      num_sala_jantar: req.body.num_sala_jantar,
      andar: req.body.andar,
      portaria_24: req.body.portaria_24,
      login_proprietario: req.body.login_proprietario,
      municipio: req.body.municipio,
      bairro: req.body.bairro,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      complemento: req.body.complemento,
      CEP: req.body.CEP,
    });

    apartamento.save(function (error) {
      if (error) res.send(error);

      res.send({ message: "Apartamento criado!" });
    });
  })

  // 2) Método: Selecionar Todos (acessar em: GET http://locahost:8000/apartamentos)
  .get(function (req, res) {
    //Função para Selecionar Todos os 'apartamentos' e verificar se há algum erro:
    Apartamento.find(function (error, apartamento) {
      if (error) res.send(error);

      res.send(apartamento);
    });
  });

// Rotas que irão terminar em '/apartamento' - GET, PUT, DELETE (by 'codigo')
router
  .route("/apartamento")

  // Método: Selecionar Por Código (acessar em: GET http://localhost:8080/apartamento)
  .get(function (req, res) {
    //Função para Selecionar Por Código e verificar se há algum erro:
    Apartamento.find({ _id: req.query.codigo }, function (error, apartamento) {
      if (error) res.send(error);

      res.send(apartamento);
    });
  })

  // Método: Atualizar (acessar em: PUT http://localhost:8000/apartamento)
  .put(function (req, res) {
    let apartamento = {
      valor_aluguel: req.body.valor_aluguel,
      num_quartos: req.body.num_quartos,
      num_suites: req.body.num_suites,
      num_sala_estar: req.body.num_sala_estar,
      num_vagas_garagem: req.body.num_vagas_garagem,
      area: req.body.area,
      armario_embutido: req.body.armario_embutido,
      descricao: req.body.descricao,
      condominio: req.body.condominio,
      num_sala_jantar: req.body.num_sala_jantar,
      andar: req.body.andar,
      portaria_24: req.body.portaria_24,
      municipio: req.body.municipio,
      bairro: req.body.bairro,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      complemento: req.body.complemento,
      CEP: req.body.CEP,
    };

    Apartamento.updateOne(
      { _id: req.body.codigo },
      apartamento,
      function (error, doc) {
        if (error) res.send(error);
        res.send(doc);
      }
    );
  })

  // Método: Excluir (acessar em: http://localhost:8080/apartamento)
  .delete(function (req, res) {
    // Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
    Apartamento.deleteOne({ _id: req.query.codigo }, function (error) {
      if (error) res.send(error);

      res.send({ message: "Apartamento excluído com sucesso!" });
    });
  });

router.route(`/apartamento/user`).post(function (req, res) {
  // Busca as casas que o proprietário oferece através do Login
  Apartamento.find(
    { login_proprietario: req.body.login_proprietario },
    function (error, apartamento) {
      if (error) res.send(error);

      res.send(apartamento);
    }
  );
});

module.exports = router;
