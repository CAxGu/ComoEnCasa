var router = require('express').Router();
var mongoose = require('mongoose');
var auth = require('../auth');
var productos = mongoose.model('Producto');
var stripe = require("stripe")(process.env.STRIPE_SECRET);
var ObjectId = require('mongoose').Types.ObjectId; 


router.post('/', auth.required, function(req, res, next){
    console.log(req.body);
    let stripeToken = req.body.stripeToken;
    let email = req.body.email;
    let cart = JSON.parse(req.body.cart);
    let amount = 0; 
    for (let i = 0; i < cart.length; i++) {
        let id =  (cart[i][0]);
        productos.find({_id: id}, 'price').then((price) => {
                console.log(price[0])
                price = price[0];
                amount += (cart[i][1].cant * price.price);
                if(i == cart.length-1){
                    console.log(amount);
                    charge();
                }
            });
        
    }

    console.log(amount);
    //it work
    function charge() {
        let charge = {
            amount: amount.toFixed(2)*100,
            currency: "eur",
            source: stripeToken
        }
        stripe.charges.create(charge, function(err, charge) {
          if(err) {
            console.log('err')
            return res.send(err);

          } else {
            console.log('ok;+)')
            return res.send({success:'Pay success'});
          }
        });
    }
});

module.exports = router;