const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
mongoose.model('User', UserScheme);

module.exports = mongoose.model('User');