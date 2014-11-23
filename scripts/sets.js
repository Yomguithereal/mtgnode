/**
 * Sets Data Building Script
 * ==========================
 *
 * Simple script used to build the needed data concerning sets from mtgjson.
 */
var sets = require('../data/mtgjson.json'),
    fs = require('fs'),
    output = {},
    _ = require('lodash');

// Looping over sets
Object.keys(sets).map(function(setName) {
  output[setName] = _.omit(sets[setName], 'cards');
  output[setName]['nb_cards'] = sets[setName].cards.length;
});

// Outputting
fs.writeFileSync(__dirname + '/../data/sets.json', JSON.stringify(output));
