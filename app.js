const express = require('express');
const db = require('./db');
const UserController = require('./user/UserController');
const ClientController = require('./client/ClientController');
const FunctionController = require('./function/FunctionController');
const BehaviorController = require('./behavior/BehaviorController');
require('dotenv').config();

const app = express();

app.use('/users', UserController);
app.use('/functions', FunctionController);
app.use('/behaviors', BehaviorController);
app.use('/clients', ClientController);

module.exports = app;