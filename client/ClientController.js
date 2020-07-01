const express = require('express');
const bodyParser = require('body-parser');
const Client = require('./Client');
require('dotenv').config();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

// CREATES A NEW Client
router.post('/', function (req, res) {
    Client.create({
        name_first: req.body.name_first,
        name_last: req.body.name_last,
        birth_date: req.body.birth_date,
        gender: req.body.gender
    },
        function (err, client) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(client);
        });
});

// GETS A SINGLE Client FROM THE DATABASE
router.get('/:id', function (req, res) {
    Client.findById(req.params.id, function (err, client) {
        if (err) return res.status(500).send("There was a problem finding the client.");
        if (!client) return res.status(404).send("No client found.");
        res.status(200).send(client);
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

    Client.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, client) {
        if (err) return res.status(500).send("There was a problem updating the client.");
        res.status(200).send(client);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Client.findByIdAndRemove(req.params.id, function (err, client) {
        if (err) return res.status(500).send("There was a problem deleting the client.");
        res.status(200).send("Client " + client.name_last + " was deleted.");
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Client.find({}, function (err, clients) {
        if (err) return res.status(500).send("There was a problem finding the clients.");
        res.status(200).send(clients);
    });
});

module.exports = router;