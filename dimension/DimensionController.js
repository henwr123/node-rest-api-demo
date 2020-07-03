const express = require('express');
const bodyParser = require('body-parser');
const Dimension = require('./Dimension');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Dimension
router.post('/', function (req, res) {

    Dimension.create({
        name: req.body.name,
        description: req.body.description
    },
        function (err, dimension) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(dimension);
        });
});

// GETS A SINGLE Dimension FROM THE DATABASE
router.get('/:id', function (req, res) {
    Dimension.findById(req.params.id, function (err, dimension) {
        if (err) return res.status(500).send("There was a problem finding the dimension.");
        if (!dimension) return res.status(404).send("No dimension found.");
        res.status(200).send(dimension);
    });
});

// UPDATES A SINGLE Dimension IN THE DATABASE
router.put('/:id', function (req, res) {

    var opts = {
        new: true,
        runValidators: true,
        useFindAndModify: false
    };

    Dimension.findByIdAndUpdate(req.params.id, req.body, opts, function (err, dimension) {
        if (err) return res.status(500).send("There was a problem updating the dimension.");
        res.status(200).send(dimension);
    });

});

// DELETES A Dimension FROM THE DATABASE
router.delete('/:id', function (req, res) {

    var opts = {
        useFindAndModify: false
    };

    Dimension.findByIdAndRemove(req.params.id, opts, function (err, dimension) {
        if (err) return res.status(500).send("There was a problem deleting the dimension.");
        res.status(200).send("Dimension " + dimension.name + " was deleted.");
    });
});

// RETURNS ALL THE Dimension IN THE DATABASE
router.get('/', function (req, res) {
    Dimension.find({}, function (err, dimensions) {
        if (err) return res.status(500).send("There was a problem finding the dimensions.");
        res.status(200).send(dimensions);
    });
});

module.exports = router;