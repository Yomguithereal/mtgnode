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

// Dump the json database
exports.dump = function(req, res) {
  require('fs').readFile(
    __dirname + '/../../db/disk.json',
    {encoding: 'utf-8'},
    function(err, file) {
      res.json(JSON.parse(file));
    }
  );
}
