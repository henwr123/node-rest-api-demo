const mongoose = require('mongoose');
//const Function = require('../function/Function');

const BehaviorScheme = new mongoose.Schema({

    name: { 
        type: String, 
        trim: true,
        required: true
    },

    description: String,

    function: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Function'
    }

});

mongoose.model('Behavior', BehaviorScheme);

module.exports = mongoose.model('Behavior');