const Book = require('../models/books.model');

module.exports.config = async (req, res) => {
    try {
       let books = await Book.find({status:'Published'});

       res.render('admin/config', {
           books
       });
    } catch(err) {
        res.send(err);
    }
};

module.exports.delete = async (req, res) => {
    
    try {
        await Book.findByIdAndDelete({_id:req.params.id}).exec();
        req.flash('success_msg',`<div class="alert alert-danger">Book has been Deleted</div>`);
        res.redirect('/admin/config');
    } catch (err) {
        res.send(err);
    }
}

exports.pending = async (req, res) => {
    try {
        var books = await Book.find({status:"Pending"}).exec()
        res.render('admin/pending', {
            books
        });
    } catch(err) {
        res.send(err);
    }
};

exports.published = async (req, res) => {
    try {
        let book = await Book.findByIdAndUpdate({_id:req.params.id});
        book.status = "Published";
        return await book.save(() => {
            req.flash('success_msg',`<div class="alert alert-success">Book '${book.title}' has been successfully Published</div>`);
            res.redirect('/admin/pending');
        });
    } catch(err) {
        res.send(err);
    }
};

exports.unpublished = async (req, res) => {
    try {
        let book = await Book.findByIdAndUpdate({_id:req.params.id});
        book.status = "Pending";
        return await book.save(() => {
            req.flash('success_msg',`<div class="alert alert-success">Book '${book.title}' has been successfully Unpublished</div>`);
            res.redirect('/admin/pending');
        });
    } catch(err) {
        res.send(err);
    }
};