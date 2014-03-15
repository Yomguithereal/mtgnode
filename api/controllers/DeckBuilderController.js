/**
 * DeckBuilderController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var set_library = require('../libraries/Set');

module.exports = {

  // Index
  builder: function(req, res) {

    // Getting Relevant Data
    Deck.find({user_id: req.session.user.id}, function(err, decks) {
     
      // Rendering the view
      res.view('deck-builder/deck-builder', {
        sets: set_library.getSetsInfo(),
        decks: decks
      });
    });
  }
};
