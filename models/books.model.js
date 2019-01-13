const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: {
        type:String
    },
    isbn: {
        type:String
    },
    pages: {
        type:String
    },
    price: {
        type:String
    },
    category: {
        type:String
    },
    body: {
        type:String
    },
    book_imageURL: {
        type:String
    },
    author_name: {
        type:String
    },
    author_about: {
        type:String
    },
    author_imageURL: {
        type:String
    },
    seller_firstname: {
        type:String
    },
    seller_middlename: {
        type:String
    },
    seller_lastname: {
        type:String
    },
    seller_address: {
        type:String
    },
    seller_contact: {
        type:String
    },
    seller_email: {
        type:String
    },
    created_on: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Book',BookSchema);