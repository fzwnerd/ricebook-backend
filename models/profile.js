const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var profileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    headline: {
        type: String,
        default: ''
    } ,
    following: [ String ],
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Profile', profileSchema);