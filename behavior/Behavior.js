const mongoose = require('mongoose');

const BehaviorScheme = new mongoose.Schema({

    name: { 
        type: String, 
        trim: true,
        required: true,
        unique: true
    },

    description: String,

    function: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Function'
    },

    dimension: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dimension'
    }

});

mongoose.model('Behavior', BehaviorScheme);

module.exports = mongoose.model('Behavior');