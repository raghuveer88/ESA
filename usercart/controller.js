const mongoose = require('mongoose');
const express = require("express")

const router = express.Router();
const Product = mongoose.model('Product');
const Cart = mongoose.model('Cart');
const User = mongoose.model('User');

router.put('/cart',async(req,res) => {
    let check_product
    try{
     check_product = await Product.findById(req.body.productId);
    }catch(err){
        return res.status(500).json("No such product registered")
    }
    if(!check_product){
        return res.status(500).json("No such product registered")
    }
    
    
    let check_cart
    try{
     check_cart = await Cart.findOne({userId:req.body.userID,productId:req.body.productId});

    }catch(err){
        return res.status(500).json("No such product registered")
    }
    if(!check_cart){
        if(check_product.availableQuantity < req.body.quant){
            return res.status(500).json("that much amount is not available")
        }
    let pq = check_product.availableQuantity-req.body.quant
    check_product.availableQuantity = pq
    const nc = new Cart({
    productName: check_product.productName,
    productId: check_product.id,
    userId: req.body.userID,
    quantity: req.body.quant,
    amount: req.body.quant*check_product.price
    })
    try{
       
        await nc.save()
        await check_product.save()
     
    }catch(err){
        return res.status(500).json("not able to make changes to cart")
    }
return res.json("Done");
    }
    else{
        if(check_product.availableQuantity<req.body.quant){
            
            return res.status(500).json("that much amount is not available")
        }
        q = check_cart.quantity
        check_cart.quantity = q+req.body.quant
        check_cart.amount = (req.body.quant+q)*check_product.price
        let presentQuantity = check_product.availableQuantity-req.body.quant
        check_product.availableQuantity = presentQuantity 

        try{
            
            await check_cart.save()
            await check_product.save()
          
        }catch(err){
         
            return res.status(500).json("not able to make changes to cart")
        }
return res.json("Done");
    }
})




router.get('/cart',async (req,res)=>{
let check_cart
    try{
     check_cart = await Cart.find({userId:req.body.userID});

    }catch(err){
        return res.status(500).json("unable to fetch cart")
    }
    if(check_cart.length == 0){
            return res.status(500).json("Cart is empty")
        }
    return res.json(check_cart)
    })

module.exports = router