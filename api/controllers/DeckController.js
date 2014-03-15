/**
 * DeckController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var card_library = require('../libraries/Card');

module.exports = {
  parse: function(req, res) {
    // TODO
  },
  detail: function(req, res) {

    // Fectching deck
    Deck.findOne(req.param('id'), function(err, deck) {
      deck.cards = card_library.getByIdArray(deck.cards);
      res.json(deck);
    });
  }
};
