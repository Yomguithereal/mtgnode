/*
| -------------------------------------------------------------------
|  MTGNode Playground Helpers
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  // Methods
  //=========
  function _getArea(side) {
    return (side === 'my') ? 'bottom' : 'top';
  }

  function _inFlagCards(cards, flag) {
    return cards.filter(function(c) {
      return c.flag === flag;
    });
  }

  function _inDeckCards(cards) {
    return _inFlagCards(cards, 'in-deck');
  }


  // Exporting
  //===========
  window.Helpers = {

    // Misc
    getArea: _getArea,

    // Filters
    inDeckCards: _inDeckCards
  };
})(jQuery, window);
