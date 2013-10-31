/*
| -------------------------------------------------------------------
|  MTGNode Deck Model
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//==============
var _ = require('lodash');
var CardModel = require('./CardModel');

// Main Class
//============
function DeckModel(){

  // Properties
  //------------
  var self = this;


  // Methods
  //----------
  this.getCards = function(user, deck_id){
    var deck = _.find(user.decks, function(deck){
      return deck.id == deck_id;
    });
    return CardModel.getByIdArray(deck.cards);
  }

}

// Exporting
//============
module.exports = new DeckModel();