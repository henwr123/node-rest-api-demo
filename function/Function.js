const mongoose = require('mongoose');

const FunctionScheme = new mongoose.Schema({
    name: String,
    description: String
});
mongoose.model('Function', FunctionScheme);

module.exports = mongoose.model('Function');