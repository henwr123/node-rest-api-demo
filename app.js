const express = require('express');
const db = require('./db');
const UserController = require('./user/UserController');

const app = express();

app.use('/users', UserController);

module.exports = app;