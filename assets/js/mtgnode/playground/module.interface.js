/*
| -------------------------------------------------------------------
|  MTGNode Playground Interface Module
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  // Deck Module
  //=============
  function InterfaceModule(side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(side);

    // Selectors
    var $block = $('#'+_area+'_helper_block');
    var $deck_counter = $block.find('.deck-counter');
    console.log($deck_counter);

    // Emettor
    //---------

    // Receptor
    //----------

    // Updating decK counter
    // TODO: refine when better methods
    this.triggers.events[side+'DeckUpdated'] = function(d) {
      var count = Helpers.inDeckCards(d.get(side+'Deck')).length;

      $deck_counter.text(count);
    }


  }

  // Exporting
  //===========
  window.InterfaceModule = InterfaceModule;
})(jQuery, window);
