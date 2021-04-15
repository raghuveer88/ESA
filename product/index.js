require('./models/product');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const productroute = require('./controller')

require('dotenv').config();

app.use(express.json());


const port = 4000;

app.get('/',(req,res) => {
    res.send('ESA');
})



app.use(productroute)
//console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useNewUrlParser: true 
})


mongoose.connection.on('connected',() => {
   console.log("connected to database")
})


mongoose.connection.on('error',() => {
   console.log("database connection failed");
})



app.listen(port,(req,res) => {
    console.log("listening on port 4000")
})