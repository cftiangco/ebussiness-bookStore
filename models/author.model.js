const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AuthorSchema = new Schema({
    name : {
        type:String
    },
    imageURL: {
        type:String
    },
    about: {
        type:String
    }
})


module.exports = mongoose.model('Author',BookSchema);