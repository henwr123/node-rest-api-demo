const mongoose = require('mongoose');

const CampaignScheme = new mongoose.Schema({

    name: { 
        type: String, 
        trim: true,
        required: true,
        unique: true
    },

    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },

    baselineTime: Date,

    phaselineTime: Date,

    startTime: Date,

    endTime: Date

});

mongoose.model('Campaign', CampaignScheme);

module.exports = mongoose.model('Campaign');