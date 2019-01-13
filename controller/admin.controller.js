const Book = require('../models/books.model');

module.exports.config = async (req, res) => {
    try {
       let books = await Book.find({});

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
        res.redirect('/admin/config');
    } catch (err) {
        res.send(err);
    }
}