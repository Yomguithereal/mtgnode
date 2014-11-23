/**
 * MTGNode Application Starting Script
 * ====================================
 *
 * Script building assets and starting the express application.
 */
var config = require('../config.json'),
    app = require('../api/app.js');

// Starting server
console.log('Listening to port: ' + config.port);
app.listen(config.port);
