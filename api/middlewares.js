/**
 * MTGNode Generic Middlewares
 * ============================
 *
 * Compilation of middlewares used throughout the express application.
 */
var types = require('typology');

module.exports = {
  validate: function(def) {
    return function(req, res, next) {

      // Retrieving params
      var data = {};
      for (var k in def)
        data[k] = req.param(k);

      // Validating params
      if (!types.check(data, def))
        return res.status(400).send('Bad Request');
      else
        return next();
    };
  }
};
