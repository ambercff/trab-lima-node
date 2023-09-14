const express = require('express');
const router = express.Router();
let User = require('./model/User.js');
let Product = require('./model/Product.js');

router.get('/', async(req, res) => {
    const user = await req.session.user
    const products = await Product.find();
    res.render("index", {user, products})
});

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/cadastro', (req, res) => {
    res.render("cadastro")
})

router.get('/product', async(req, res) => {
    const user = req.session.user
    const products = await Product.find();
    res.render("product", {user, products});
})

router.get('/ferramentas_medicao', async(req, res) => {
    const user = req.session.user
    const products = await Product.find();
    res.render("ferramentas_medicao", {user, products});
})
router.get('/ferramentas_eletricas', async(req, res) => {
    const user = req.session.user
    const products = await Product.find();
    res.render("ferramentas_eletricas", {user, products});
})

router.get('/fale-conosco', (req, res) => {
    res.render("fale_conosco")
})

router.post('/cadastro', async(req, res) => {
    const {email, senha, nome, confSenha} = req.body;

    if (senha != confSenha) {
        res.render('cadastro.ejs');
    } else {
        const user = new User({email, senha, nome});
        try{
            await user.save();
            res.redirect("login")
        }  catch (erro) {
            console.log("Algo deu errado!")
        }
    }

});

router.post('/login', async(req, res) => {

    const {email, senha} = req.body; //as chaves procuram por atributos com os nomes email e senha

    const user = await User.findOne({email, senha});

    if(!user) {
        return;
    }

    req.session.user = user;
    res.redirect("/")

});

router.post('/logout', async(req,res) => {
    // req.session.user = undefined;
    // res.redirect('/')
    req.session.destroy((err) => {
        if (err) {
          console.error('Erro ao encerrar a sessão:', err);
        }
        res.redirect('/');
      });
      

})

router.get('/cart', async(req, res) => {

    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    let user = await User.findOne(req.session.user.id).populate('cart.compras.product');

    console.log(user)
    console.log(user.cart.compras);
    res.render("cart", {user});
})

router.post('/cart/add', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    const {product} = req.body;
    const user = await User.findOne(req.session.user.id);
    user.cart.compras.push({product: product});

    try {
        await user.save();
        res.redirect('/');
    } catch (err) {
        console.log(err)
    }
});

router.post('/cart/remove', async(req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    const {productId} = req.body;
    const user = await User.findOne(req.session.user.id);
    const removeId = await user.cart.compras._id

    if (productId == removeId) {
        user.cart.compras.splice({product: productId});
    } else {
        console.log("Produto não encontrado!")
    }

    try {
        await user.save();
        res.redirect('/');
    } catch (err) {
        console.log(err)
    }
});



module.exports = router;