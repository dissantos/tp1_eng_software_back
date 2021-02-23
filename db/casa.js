const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CasaSchema = new Schema({
    valor_aluguel: Number,
    num_quartos: Number,
    num_suites: Number,
    num_sala_estar: Number,
    num_vagas_garagem: Number,
    area: Number,
    armario_embutido: Boolean,
    descricao: String,
    login_proprietario: String,
    codigo: Number,
    logradouro: String,
    numero: Number,
    complemento: String,
    CEP: String
})

module.exports = mongoose.model('Casa', CasaSchema, 'casa');