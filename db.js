const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@node-demo.gnxdd.mongodb.net/<dbname>?retryWrites=true&w=majority';

const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbUri, config);