const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String, 
    nome: String,
    senha: String
});

const User = mongoose.model('User', userSchema)

module.exports = User; 
