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
    var data = {
      sets: set_library.getSetsInfo(),
      decks : req.session.user.decks
    };

    // Rendering the view
    res.view('deck-builder/deck-builder', data);
  }
};
