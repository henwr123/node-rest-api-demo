const mongoose = require('mongoose');
const Function = require('../function/Function');

const BehaviorScheme = new mongoose.Schema({

    name: { 
        type: String, 
        required: true 
    },

    description: String,

    function_id: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {

                return new Promise(function (resolve, reject) {

                    // Validate the function exists
                    Function.findById(value, function (err, func) {
                        if (err) {
                            resolve(false);
                        }
                        else {
                            resolve(true);
                        }
                    });

                });
            }
        }
    }
});

mongoose.model('Behavior', BehaviorScheme);

module.exports = mongoose.model('Behavior');