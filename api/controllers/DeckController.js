/**
 * DeckController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var card_library = require('../libraries/Card'),
    deck_library = require('../libraries/Deck');

module.exports = {
  parse: function(req, res) {
    res.json(deck_library.parse(req.param('text'), req.param('format')));
  },
  detail: function(req, res) {

    // Fectching deck
    Deck.findOne(req.param('id'), function(err, deck) {
      deck.cards = card_library.getByIdArray(deck.cards);
      res.json(deck);
    });
  }
};
