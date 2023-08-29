let User = require('./model/User.js');
let session = require('express-session')

let users = [];
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); //ler o body

const express = require('express');
const app = express();
app.set("view engine", "ejs")

app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({extended: true})) //usando o decodificador para entender o que vem do body
app.use(session({
    secret: "di3j29idmnadp2-dça2dlkf",
    resalve: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    const user = req.session.user
    res.render("index", {user})
});

app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/cadastro', (req, res) => {
    res.render("cadastro")
})

app.get('/cart', (req, res) => {
    res.render("cart")
})

app.get('/product', (req, res) => {
    res.render("product")
})

app.get('/fale-conosco', (req, res) => {
    res.render("fale_conosco")
})

app.post('/cadastro', async(req, res) => {
    const {email, senha, nome} = req.body;
    const user = new User({email, senha, nome});
    try{
        await user.save();
        res.redirect("login")
    }  catch (erro) {
        console.log("Algo deu errado!")
    }
});

app.post('/login', async(req, res) => {

    const {email, senha} = req.body; //as chaves procuram por atributos com os nomes email e senha

    const user = await User.findOne({email, senha});

    if(!user) {
        return;
    }

    req.session.user = user;
    res.redirect("/")

});

mongoose.connect("mongodb+srv://ambercf13:eimGHh3CZ05UsiYF@teste.yzewypv.mongodb.net/?retryWrites=true&w=majority").then(() => {
    app.listen(3030, () => {
        console.log("corinthians")
    })
})



