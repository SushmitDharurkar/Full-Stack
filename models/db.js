"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/seconddb');

var nameSchema = new Schema({
    name : String,
    no : Number,
    // creation_date : Date
});

var User = mongoose.model('User', nameSchema);

module.exports = User;