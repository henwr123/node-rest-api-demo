const mongoose = require('mongoose');

const DimensionScheme = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    description: String

});

mongoose.model('Dimension', DimensionScheme);

module.exports = mongoose.model('Dimension');