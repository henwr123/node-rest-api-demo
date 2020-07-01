const mongoose = require('mongoose');
require('dotenv').config();

const ClientScheme = new mongoose.Schema({
    name_first: String,
    name_last: String,
    birth_date: Date,
    gender: { type: String }
});
mongoose.model('Client', ClientScheme);

module.exports = mongoose.model('Client');