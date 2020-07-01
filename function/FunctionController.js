const express = require('express');
const bodyParser = require('body-parser');
const Function = require('./Function');


const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Function
router.post('/', function (req, res) {
    Function.create({
        name: req.body.name,
        description: req.body.description
    },
        function (err, func) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(func);
        });
});

// GETS A SINGLE Function FROM THE DATABASE
router.get('/:id', function (req, res) {
    Function.findById(req.params.id, function (err, func) {
        if (err) return res.status(500).send("There was a problem finding the func.");
        if (!func) return res.status(404).send("No func found.");
        res.status(200).send(func);
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

    Function.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, func) {
        if (err) return res.status(500).send("There was a problem updating the func.");
        res.status(200).send(func);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Function.findByIdAndRemove(req.params.id, function (err, func) {
        if (err) return res.status(500).send("There was a problem deleting the func.");
        res.status(200).send("Function " + func.name + " was deleted.");
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Function.find({}, function (err, funcs) {
        if (err) return res.status(500).send("There was a problem finding the funcs.");
        res.status(200).send(funcs);
    });
});

module.exports = router;