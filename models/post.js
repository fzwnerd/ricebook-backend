const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    author:  {
        type: String,
        required: true
    },
    body:  {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


const postSchema = new Schema({
    author:  {
        type: String,
        required: true
    },
    body:  {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    picture: {
        type: String,
        default: ''
    },
    comments: [ commentSchema ]
});

var Posts = mongoose.model('Post', postSchema);

module.exports = Posts;