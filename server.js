const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});