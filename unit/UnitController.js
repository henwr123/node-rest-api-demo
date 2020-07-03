const express = require('express');
const bodyParser = require('body-parser');
const Unit = require('./Unit');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Unit
router.post('/', function (req, res) {

    Unit.create({
        name: req.body.name,
        description: req.body.description,
        abbreviation: req.body.abbreviation,
        dimension: req.body.dimension
    },
        function (err, unit) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(unit);
        });
});

// GETS A SINGLE Unit FROM THE DATABASE
router.get('/:id', function (req, res) {
    Unit.findById(req.params.id, function (err, unit) {
        if (err) return res.status(500).send("There was a problem finding the unit.");
        if (!unit) return res.status(404).send("No unit found.");
        res.status(200).send(unit);
    }).populate('dimension');
});

// UPDATES A SINGLE Unit IN THE DATABASE
router.put('/:id', function (req, res) {

    var opts = {
        new: true,
        runValidators: true,
        useFindAndModify: false
    };

    Unit.findByIdAndUpdate(req.params.id, req.body, opts, function (err, unit) {
        if (err) return res.status(500).send("There was a problem updating the unit.");
        res.status(200).send(unit);
    });

});

// DELETES A Unit FROM THE DATABASE
router.delete('/:id', function (req, res) {

    var opts = {
        useFindAndModify: false
    };

    Unit.findByIdAndRemove(req.params.id, opts, function (err, unit) {
        if (err) return res.status(500).send("There was a problem deleting the unit.");
        res.status(200).send("Unit " + unit.name + " was deleted.");
    });
});

// RETURNS ALL THE Unit IN THE DATABASE
router.get('/', function (req, res) {
    Unit.find({}, function (err, units) {
        if (err) return res.status(500).send("There was a problem finding the units.");
        res.status(200).send(units);
    }).populate('dimension');
});

module.exports = router;