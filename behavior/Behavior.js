const mongoose = require('mongoose');
const Function = require('../function/Function');

const BehaviorScheme = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    function_id: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, callback) {

                // Validate the function exists
                Function.findById(v, function (err, func) {
                    if (err) {
                        callback(false);
                    }
                    else {
                        callback(true);
                    }
                });
            },
            message: 'The function id provided was not valid'
        }
    }
});
mongoose.model('Behavior', BehaviorScheme);

module.exports = mongoose.model('Behavior');