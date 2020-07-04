const express = require('express');
const bodyParser = require('body-parser');
const Data = require('./Data');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Data
router.post('/', function (req, res) {

    Data.create({
        client: req.body.client,
        behavior: req.body.behavior,
        campaign: req.body.campaign,
        time: req.body.time,
        value: req.body.value,
        unit: req.body.unit,
        notes: req.body.notes,
        timeEntered: req.body.timeEntered
    },
        function (err, data) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(data);
        });
});

// GETS A SINGLE Data FROM THE DATABASE
router.get('/:id', function (req, res) {
    Data.findById(req.params.id, function (err, data) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        if (!data) return res.status(404).send("No data found.");
        res.status(200).send(data);
    }).populate('client').populate('behavior').populate('campaign').populate('unit');
});

// UPDATES A SINGLE Data IN THE DATABASE
router.put('/:id', function (req, res) {

    var opts = {
        new: true,
        runValidators: true,
        useFindAndModify: false
    };

    Data.findByIdAndUpdate(req.params.id, req.body, opts, function (err, data) {
        if (err) return res.status(500).send("There was a problem updating the data.");
        res.status(200).send(data);
    });

});

// DELETES A Data FROM THE DATABASE
router.delete('/:id', function (req, res) {

    var opts = {
        useFindAndModify: false
    };

    Data.findByIdAndRemove(req.params.id, opts, function (err, data) {
        if (err) return res.status(500).send("There was a problem deleting the data.");
        res.status(200).send("Data " + data.name + " was deleted.");
    });
});

// RETURNS ALL THE Data IN THE DATABASE
router.get('/', function (req, res) {
    Data.find({}, function (err, datas) {
        if (err) return res.status(500).send("There was a problem finding the datas.");
        res.status(200).send(datas);
    }).populate('client').populate('behavior').populate('campaign').populate('unit');
});

module.exports = router;