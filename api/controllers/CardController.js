/**
 * CardController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */
var CardModel = require('../raw_models/CardModel');

module.exports = {
  get: function(req, res){
    res.json(CardModel.get(parseInt(req.param('id'))));
  }
}
