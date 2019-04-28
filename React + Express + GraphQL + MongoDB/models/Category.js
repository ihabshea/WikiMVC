const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    titles: [{
        type: Schema.Types.ObjectId,
        ref: 'Title'
    }],
    descriptions: [{
        type: Schema.Types.ObjectId,
        ref: "Description"
    }],
    descriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'Description'
    }],
    shorthand: {
        type: String,
        require: true
    },
    languages: [{
        type: Schema.Types.ObjectId,
        ref: 'Language'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Category', categorySchema);