/**
 * Cards Data Building Script
 * ===========================
 *
 * Simple script used to build the needed data concerning cards from mtgjson.
 */
var sets = require('../data/mtgjson.json'),
    fs = require('fs'),
    _ = require('lodash'),
    cards = [];

// Helpers
function validSet(set) {
  return (!~['ATH', 'ITP', 'DKM', 'RQS', 'DPA'].indexOf(set.code) &&
          set.code.charAt(0) !== 'p');
}

// Looping over sets
for (var set in sets) {
  if (validSet(sets[set])) {

    // Saving card
    cards = cards.concat(sets[set].cards.map(function(c) {
      return _.merge(c, {set: set});
    }));

    // Registering set
    sets[set].nb_cards = sets[set].cards.length;
    delete sets[set].cards;
  }
  else {

    // Avoiding fishy set
    delete sets[set];
  }
}

// Reversing in order to get latest card first
cards.reverse();

// Outputting
fs.writeFileSync(__dirname + '/../data/sets.json', JSON.stringify(sets));
fs.writeFileSync(__dirname + '/../data/cards.json', JSON.stringify(cards));
