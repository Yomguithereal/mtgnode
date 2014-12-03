/**
 * Compendium Model
 * =================
 *
 * Useful methods to query the cards data.
 */
var CARDS = require('../../data/cards.json'),
    SETS = require('../../data/sets.json'),
    _ = require('lodash');

// Datasets
var data = {
  lightSets: _(SETS).values().map(function(s) {
    return {
      name: s.name,
      code: s.code
    };
  }).value()
};

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
  },
  getSetsInfo: function() {
    return data.lightSets;
  }
};

// Exporting
module.exports = model;
