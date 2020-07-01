const mongoose = require('mongoose');

const FunctionScheme = new mongoose.Schema({
    name: { type: String, required: true },
    description: String
});
mongoose.model('Function', FunctionScheme);

module.exports = mongoose.model('Function');