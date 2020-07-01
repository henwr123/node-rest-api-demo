const mongoose = require('mongoose');
require('dotenv').config();

const BehaviorScheme = new mongoose.Schema({
    name: String,
    description: String
});
mongoose.model('Behavior', BehaviorScheme);

module.exports = mongoose.model('Behavior');