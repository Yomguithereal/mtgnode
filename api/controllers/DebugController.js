/**
 * DebugController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var fs = require('fs');

module.exports = {

  // Dumping the current database
  dump: function(req, res) {
    fs.readFile('./database/mtgnode.db', {encoding: 'utf-8'},
      function(err, data) {
        res.json(JSON.parse(data));
      }
    );
  }
};
