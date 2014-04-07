/*
| -------------------------------------------------------------------
|  MTGNode Decks Library
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//==============
var parser = require('mtg-parser'),
    card_library = require('./Card');

// Main Class
//============
function DeckLibrary() {

  // Parse a deck
  this.parse = function(text, format) {
    var cards = [],
        deck = parser(text, format);

    deck.cards.map(function(c) {
      var potential_cards;

      if (c.set !== undefined)
        potential_cards = card_library.searchByNameAndSet(c.name, c.set);
      else
        potential_cards = card_library.searchByName(c.name);

      if (potential_cards.length > 0)
        for (var i = 0; i < c.number; i++)
          cards.push(potential_cards[0]);
    });

    return cards;
  }
}

// Exporting
//===========
module.exports = new DeckLibrary();
