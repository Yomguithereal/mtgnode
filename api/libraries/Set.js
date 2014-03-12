/*
| -------------------------------------------------------------------
|  MTGNode Sets Library
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//==============
var sets = require('../../database/sets.json'),
    card_library = require('./Card');

// Main Class
//============
function SetLibrary() {

  // Return info for a precise set
  this.getSetInfo = function(set_code) {
    return _.find(sets, function(set) {
      return set.code === set_code;
    });
  }

  // Return sets infos
  this.getSetsInfo = function() {
    return sets;
  }

  // Return every cards from a particular set
  this.getCards = function(set_code) {
    return card_library.getBy({set: set_code});
  }
}

// Exporting
//===========
module.exports = new SetLibrary();
