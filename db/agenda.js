const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AgendaSchema = new Schema({
    data: Date,
    codigo_imovel: String,
    nome: String,
    CPF: String,
    telefone: String
})

module.exports = mongoose.model('Agenda', AgendaSchema, 'agenda')