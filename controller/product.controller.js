const Book = require('../models/books.model');
const moment = require('moment');

exports.home = (req,res) => {
    let queryCategory = "";
    let query = false;
    var perPage = 3; //3 default
    var page = req.params.page || 1;

    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Book.find({title:regex})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(books => {
            Book.count({title:regex}).then(count => {
                res.render('products/product', {
                    books:books,
                    current:page,
                    pages:Math.ceil(count/perPage),
                    myFunc:myFunc,
                    query:true,
                    queryCategory:req.query.category,
                    count:count,
                    moment:moment
                });
            });
        }).catch(err => res.send(err));
    } else {
        if(req.query.category)
        {
            Book.find({category:req.query.category})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then(books => {
                Book.count({category:req.query.category}).then(count => {
                    res.render('products/product', {
                        books:books,
                        current:page,
                        pages:Math.ceil(count/perPage),
                        myFunc:myFunc,
                        query:true,
                        queryCategory:req.query.category,
                        count:count,
                        moment:moment
                    });
                });
            }).catch(err => res.send(err));
        } else {
            Book.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then(books => {
                Book.count({}).then(count => {
                    res.render('products/product', {
                        books:books,
                        current:page,
                        pages:Math.ceil(count/perPage),
                        myFunc:myFunc,
                        query:false,
                        queryCategory:"",
                        count:count,
                        moment:moment
                    });
                });
            }).catch(err => res.send(err));
        }        
    }

};

exports.add = (req, res) => {
   res.render('products/add');
};

exports.create = async (req, res) => {

    let newBook = new Book({
        isbn:req.body.book_isbn,
        title:req.body.book_title,
        pages:req.body.book_pages,
        price:req.body.book_price,
        category:req.body.book_category,
        body:req.body.book_body,
        book_imageURL:req.body.book_imageURL,
        author_name:req.body.author_name,
        author_about:req.body.author_about,
        author_imageURL:req.body.author_imageURL,
        seller_firstname:req.body.seller_firstname,
        seller_middlename:req.body.seller_middlename,
        seller_lastname:req.body.seller_lastname,
        seller_address:req.body.seller_address,
        seller_contact:req.body.seller_contact,
        seller_email:req.body.seller_email
    });
    try {
        let savedBook = await newBook.save()
        res.redirect('/products');
    } catch(err) {
        res.send(err)
    }
};

exports.edit = (req, res) => {
    res.render('products/edit');
};

let myFunc = {
    truncate : function(str, len) {
        if(str.length > len && str.length > 0) {
            var new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
            return new_str + '...'
        }
        return str;
    },
    stripTags: function(input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    }
}

exports.show = async (req, res) => {
    try {
        const book = await Book.findById({_id:req.params.id});
        res.render('products/show', {
            book:book,
            moment
        });
    } catch(e) {
        res.send(e);
    }
};

exports.delete = (req, res) => {
    Book.findOneAndDelete({_id:req.params.id})
        .then(() => {
            res.send("Record Deleted");
        })
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};