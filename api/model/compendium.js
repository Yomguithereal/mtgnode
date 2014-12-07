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
  lightSets: _(SETS)
    .values()
    .map(function(s) {
      return {
        block: s.block || 'standard',
        name: s.name,
        code: s.code
      };
    })
    .groupBy('block')
    .map(function(sets) {
      return {
        block: sets[0].block,
        sets: _.map(sets, function(s) {
          return _.omit(s, 'block');
        })
      }
    })
    .value()
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
  },
  getSetInfo: function(setCode) {
    return SETS[setCode];
  },
  getSetCards: function(setCode) {

    // TODO: optimize
    // TODO: finer sorting
    return _(CARDS)
      .filter({set: setCode})
      .sortBy('name')
      .value();
  }
};

// Exporting
module.exports = model;
