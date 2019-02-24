// importing mongoose library to create database schema
var mongoose = require('mongoose');

// creating our first schema named todo with one field in it named text of string type and initialised with an emplty string
module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    }
});