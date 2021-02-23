const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const Endereco = require('../db/endereco')

const ApartamentoSchema = new Schema({
    valor_aluguel: Number,
    num_quartos: Number,
    num_suites: Number,
    num_sala_estar: Number,
    num_vagas_garagem: Number,
    area: Number,
    armario_embutido: Boolean,
    condominio: Number,
    descricao: String,
    num_sala_jantar: Number,
    andar: Number,
    portaria_24: Boolean,
    login_proprietario: String,
    codigo: Number,
    municipio: String,
    bairro: String,
    logradouro: String,
    numero: Number,
    complemento: String,
    CEP: String
})

module.exports = mongoose.model('Apartamento', ApartamentoSchema, 'apartamento')