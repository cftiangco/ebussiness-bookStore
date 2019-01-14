const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
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

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

app.use(flash());

//global variables

app.use(function(req,res,next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.redirect('/products')
});

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