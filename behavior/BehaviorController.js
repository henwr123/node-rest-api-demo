const express = require('express');
const bodyParser = require('body-parser');
const Behavior = require('./Behavior');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Behavior
router.post('/', function (req, res) {

    Behavior.create({
        name: req.body.name,
        description: req.body.description,
        function: req.body.function,
        dimension: req.body.dimension
    },
        function (err, behavior) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(behavior);
        });
});

// GETS A SINGLE Behavior FROM THE DATABASE
router.get('/:id', function (req, res) {
    Behavior.findById(req.params.id, function (err, behavior) {
        if (err) return res.status(500).send("There was a problem finding the behavior.");
        if (!behavior) return res.status(404).send("No behavior found.");
        res.status(200).send(behavior);
    }).populate('function').populate('dimension');
});

// UPDATES A SINGLE Behavior IN THE DATABASE
router.put('/:id', function (req, res) {

    var opts = {
        new: true,
        runValidators: true,
        useFindAndModify: false
    };

    Behavior.findByIdAndUpdate(req.params.id, req.body, opts, function (err, behavior) {
        if (err) return res.status(500).send("There was a problem updating the behavior.");
        res.status(200).send(behavior);
    });

});

// DELETES A Behavior FROM THE DATABASE
router.delete('/:id', function (req, res) {

    var opts = {
        useFindAndModify: false
    };

    Behavior.findByIdAndRemove(req.params.id, opts, function (err, behavior) {
        if (err) return res.status(500).send("There was a problem deleting the behavior.");
        res.status(200).send("Behavior " + behavior.name + " was deleted.");
    });
});

// RETURNS ALL THE Behavior IN THE DATABASE
router.get('/', function (req, res) {

    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Behavior.find(condition, function (err, behaviors) {
        if (err) return res.status(500).send("There was a problem finding the behaviors.");
        res.status(200).send(behaviors);
    }).populate('function').populate('dimension');

});

module.exports = router;