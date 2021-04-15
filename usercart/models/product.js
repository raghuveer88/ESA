const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    productModel: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableQuantity:{
        type: Number,
        required: true,
    },
})

mongoose.model('Product',productSchema);