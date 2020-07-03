const mongoose = require('mongoose');

const UnitController = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    description: String,

    abbreviation: {
        type: String,
        trim: true,
        required: true
    },

    dimension: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dimension'
    }

});

mongoose.model('Unit', UnitController);

module.exports = mongoose.model('Unit');