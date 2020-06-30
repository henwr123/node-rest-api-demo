const mongoose = require('mongoose');

const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb+srv://<user>:<password>@node-demo.gnxdd.mongodb.net/<dbname>?retryWrites=true&w=majority', config);