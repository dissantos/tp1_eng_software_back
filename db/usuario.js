const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    nome: String,
    email: String,
    login: String,
    senha: String,
    telefone: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuario')