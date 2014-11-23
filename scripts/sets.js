/**
 * Sets Data Building Script
 * ==========================
 *
 * Simple script used to build the needed data concerning sets from mtgjson.
 */
var sets = require('../data/mtgjson.json'),
    fs = require('fs'),
    helpers = require('./helpers.js'),
    _ = require('lodash');

// Looping over sets
for (var set in sets) {
  if (helpers.validSet(sets[set])) {
    sets[set].nb_cards = sets[set].cards.length;
    delete sets[set].cards;
  }
  else {
    delete sets[set];
  }
}

// Outputting
fs.writeFileSync(__dirname + '/../data/sets.json', JSON.stringify(sets));
