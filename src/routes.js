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
    const user = await req.session.user
    const products = await Product.find();
    res.render("product", {user, products});
})

router.get('/ferramentas_medicao', async(req, res) => {
    const user = await req.session.user
    const products = await Product.find();
    res.render("ferramentas_medicao", {user, products});
})
router.get('/ferramentas_eletricas', async(req, res) => {
    const user = await req.session.user
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

    console.log(req.session.user.id)

});

router.post('/logout', async(req,res) => {
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
    } else {

        const user_session = req.session.user._id;

        let user = await User.findById(user_session).populate('cart.compras.product');
    
        res.render("cart", {user});
    }

});

router.post('/cart/add', async(req, res) => {
    const user_session = req.session.user._id;
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    
    const {product} = req.body;
    const user = await User.findById(user_session);
    user.cart.compras.push({product: product});

    try {
        await user.save();
        res.redirect('/');
    } catch (err) {
        console.log(err)
    }
});

router.post('/cart/remove', async (req, res) => {
    const user_session = req.session.user._id;

    if (!user_session) {
        res.redirect('/login');
        return;
    }

    const { productId } = req.body;
    console.log(productId)

    try {
        const user = await User.findByIdAndUpdate(
            user_session,
            {
                $pull: { 'cart.compras': { _id: productId } }
            },
            { new: true }
        );

        if (!user) {
            console.log('Usuário não encontrado');
            res.redirect('/login'); 
            return;
        }

        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao remover o produto do carrinho.' });
    }
});



module.exports = router;