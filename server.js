const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./routes/product.route');
const Admin = require('./routes/admin.route');
const db = require('./config/db');

//mongoose connection middleware
mongoose.connect(db.mongoURI, {useNewUrlParser: true});


//ejs middleware
app.set('view engine', 'ejs');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'public')));

app.get('/products/about', (req,res) => {
    res.render('about');
});

app.get('/products/contact', (req,res) => {
    res.render('contact');
});

app.use('/products',Product);
app.use('/admin',Admin);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running at Port ${PORT}`);
});