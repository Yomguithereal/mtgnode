/**
 * Compendium Model
 * =================
 *
 * Useful methods to query the cards data.
 */
var CARDS = require('../../data/cards.json'),
    SETS = require('../../data/sets.json'),
    _ = require('lodash');

var model = {
  getCardById: function(mid) {
    return _.find(CARDS, function(card) {
      return card.multiverseid === mid;
    });
  },
  getCardsById: function(mids) {
    var cards = [],
        cache = {};

    mids.forEach(function(mid) {
      if (!cache[mid])
        cache[mid] = model.getCardById(mid);
      cards.push(cache[mid]);
    });

    return cards;
  }
};

// Exporting
module.exports = model;
