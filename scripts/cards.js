/**
 * Cards Data Building Script
 * ===========================
 *
 * Simple script used to build the needed data concerning cards from mtgjson.
 */
var sets = require('../data/mtgjson.json'),
    fs = require('fs'),
    helpers = require('./helpers.js'),
    _ = require('lodash'),
    cards = [];

// Looping over sets
for (var set in sets) {
  if (!helpers.validSet(sets[set]))
    continue;

  cards = cards.concat(sets[set].cards);
}

// Reversing in order to get latest card first
cards.reverse();

// Outputting
fs.writeFileSync(__dirname + '/../data/cards.json', JSON.stringify(cards));
