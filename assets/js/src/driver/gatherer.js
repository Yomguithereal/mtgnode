/*
| -------------------------------------------------------------------
|  MTGNode Gatherer Card Driver
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function(undefined) {

  // Properties
  //------------
  var baseUrl = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card';

  // Driver
  //--------
  this.currentDriver = function(card) {
    return baseUrl + '&multiverseid=' + card.multiverseid;
  };
}).call(this);
