const express = require('express');
const bodyParser = require('body-parser');
const Behavior = require('./Behavior');
const Function = require('../function/Function');
require('dotenv').config();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Behavior
router.post('/', function (req, res) {

    // Validate the function exists
    Function.findById(req.body.function_id, function (err, func) {

        if (err) return res.status(500).send("There was a problem finding the function provided.");

        Behavior.create({
            name: req.body.name,
            description: req.body.description,
            function_id: req.body.function_id
        },
            function (err, behavior) {
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
                res.status(200).send(behavior);
            });


    });

});

// GETS A SINGLE Behavior FROM THE DATABASE
router.get('/:id', function (req, res) {
    Behavior.findById(req.params.id, function (err, behavior) {
        if (err) return res.status(500).send("There was a problem finding the behavior.");
        if (!behavior) return res.status(404).send("No behavior found.");
        res.status(200).send(behavior);
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

    if (req.body.function_id) {

        // Validate the function exists
        Function.findById(req.body.function_id, function (err, func) {

            if (err) return res.status(500).send("There was a problem finding the function provided.");

            Behavior.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, behavior) {
                if (err) return res.status(500).send("There was a problem updating the behavior.");
                res.status(200).send(behavior);
            });
        });

    } else {

        Behavior.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, behavior) {
            if (err) return res.status(500).send("There was a problem updating the behavior.");
            res.status(200).send(behavior);
        });
    }
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Behavior.findByIdAndRemove(req.params.id, function (err, behavior) {
        if (err) return res.status(500).send("There was a problem deleting the behavior.");
        res.status(200).send("Behavior " + behavior.name + " was deleted.");
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Behavior.find({}, function (err, behaviors) {
        if (err) return res.status(500).send("There was a problem finding the behaviors.");
        res.status(200).send(behaviors);
    });
});

module.exports = router;