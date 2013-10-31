/*
| -------------------------------------------------------------------
|  MTGNode Sets Model
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//===============
var sets = require('../../db/SetInfos');
var CardModel = require('./CardModel');

// Main Class
//============
function SetModel(){

  // Return set infos
  this.getSetInfos = function(){
    return sets;
  }

  // Return every cards from a particular set
  this.getCards = function(set_code){
    return CardModel.getBy({set: set_code});
  }
}

// Exporting
//============
module.exports = new SetModel();