const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    uploaded: {
        type: String,
        require: true
    },
    caption: { 
        type: String,
        require: true
    },
    language: {
        type: Schema.Types.ObjectId,
        ref: "Language"
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article" 
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category" 
    },
});
module.exports = mongoose.model('Picture', pictureSchema);