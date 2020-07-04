const express = require('express');
const bodyParser = require('body-parser');
const Campaign = require('./Campaign');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Campaign
router.post('/', function (req, res) {

    Campaign.create({
        name: req.body.name,
        client: req.body.client,
        baselineTime: req.body.baselineTime,
        phaselineTime: req.body.phaselineTime,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    },
        function (err, campaign) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(campaign);
        });
});

// GETS A SINGLE Campaign FROM THE DATABASE
router.get('/:id', function (req, res) {
    Campaign.findById(req.params.id, function (err, campaign) {
        if (err) return res.status(500).send("There was a problem finding the campaign.");
        if (!campaign) return res.status(404).send("No campaign found.");
        res.status(200).send(campaign);
    }).populate('client');
});

// UPDATES A SINGLE Campaign IN THE DATABASE
router.put('/:id', function (req, res) {

    var opts = {
        new: true,
        runValidators: true,
        useFindAndModify: false
    };

    Campaign.findByIdAndUpdate(req.params.id, req.body, opts, function (err, campaign) {
        if (err) return res.status(500).send("There was a problem updating the campaign.");
        res.status(200).send(campaign);
    });

});

// DELETES A Campaign FROM THE DATABASE
router.delete('/:id', function (req, res) {

    var opts = {
        useFindAndModify: false
    };

    Campaign.findByIdAndRemove(req.params.id, opts, function (err, campaign) {
        if (err) return res.status(500).send("There was a problem deleting the campaign.");
        res.status(200).send("Campaign " + campaign.name + " was deleted.");
    });
});

// RETURNS ALL THE Campaign IN THE DATABASE
router.get('/', function (req, res) {
    Campaign.find({}, function (err, campaigns) {
        if (err) return res.status(500).send("There was a problem finding the campaigns.");
        res.status(200).send(campaigns);
    }).populate('client');
});

module.exports = router;