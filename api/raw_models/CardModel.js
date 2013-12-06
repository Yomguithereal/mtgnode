/*
| -------------------------------------------------------------------
|  MTGNode Cards Model
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//==============
var _ = require('lodash');

// Main Class
//============
function CardModel(){

  // Properties
  //------------
  var _this = this,
      _cards = require('../../db/AllCards.json');


  // Utilities
  //-----------

  // Get card by Id
  this.get = function(id) {
    return _.find(_cards, function(card) {
      return card.multiverseid === id;
    });
  }

  // Search card by criteria
  this.getBy = function(criteria) {
    return _cards.filter(function(card) {
      return Object.keys(criteria).filter(function(key) {

        // TODO :: If Array
        // TODO :: If fuzzy
        // TODO :: Conditions
        return card[key] === criteria[key];
      }).length == Object.keys(criteria).length;
    });
  }

  // Batch search card by array
  this.getByIdArray = function(card_array){
    var index = {};

    return card_array.map(function(id) {
      if (id in index) {
        var card = index[id];
      }
      else{
        var card = _.find(_cards, function(c) {
          return c.multiverseid === id;
        });
        index[id] = card;
      }

      return card;
    });
  }

  // Search by card name
  this.searchByName = function(name) {
    return _cards.filter(function(c) {
      return ~c.name.toLowerCase().indexOf(name.toLowerCase());
    });
  }

  // Search by card name and set
  this.searchByNameAndSet = function(name, set) {
    return _cards.filter(function(c) {
      return (c.set === set &&
              ~c.name.toLowerCase().indexOf(name.toLowerCase()));
    });
  }
}

// Exporting
//============
module.exports = new CardModel();
