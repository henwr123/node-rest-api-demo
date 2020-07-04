const mongoose = require('mongoose');

const DataScheme = new mongoose.Schema({

    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign'
    },

    behavior: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Behavior'
    },

    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },

    time: {
        type: Date,
        required: true,
        default: new Date()
    },

    value: {
        type: Number
    },

    unit: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Unit'
    },

    notes: { 
        type: String, 
    },

    timeEntered: {
        type: Date,
        required: true,
        default: new Date()
    }

});

mongoose.model('Data', DataScheme);

module.exports = mongoose.model('Data');