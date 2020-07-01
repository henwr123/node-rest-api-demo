const mongoose = require('mongoose');
require('dotenv').config();

const BehaviorScheme = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    function_id: String
});
mongoose.model('Behavior', BehaviorScheme);

module.exports = mongoose.model('Behavior');