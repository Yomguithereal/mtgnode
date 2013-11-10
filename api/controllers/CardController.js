/**
 * CardController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */
var CardModel = require('../raw_models/CardModel');
var SetModel = require('../raw_models/SetModel');

// Display one card
exports.get = function(req, res) {
  res.json(CardModel.get(+req.param('id')));
}

// Display several card
exports.batch = function(req, res) {
  var cards = JSON.parse(req.param('deck')).cards;
  res.json(CardModel.getByIdArray(cards));
}

// Display the whole set
exports.set = function(req, res) {
  res.json(SetModel.getCards(req.param('id')));
}
