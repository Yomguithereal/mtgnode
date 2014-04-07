/*
| -------------------------------------------------------------------
|  MTGNode mtgimage.com Card Driver
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function(undefined) {

  // Properties
  //------------
  var baseUrl = 'http://mtgimage.com/multiverseid/';

  // Driver
  //--------
  this.currentDriver = function(card) {
    return baseUrl + card.multiverseid + '.jpg';
  };
}).call(this);
