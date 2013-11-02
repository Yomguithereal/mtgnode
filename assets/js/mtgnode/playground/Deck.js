/*
| -------------------------------------------------------------------
|  MTGNode Playground Deck Module
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
  function DeckModule(side) {
    domino.module.call(this);
    var _this = this;

    var _area = (side === 'my') ? 'bottom' : 'top';
    var _template = new CardTemplate(side);

    // Selectors
    var $emplacement = $('#'+_area+'_deck');

    // Emettor
    //---------

    // Receptor
    //----------

    // Receiving cards
    this.triggers.events[side+'DeckSelected'] = function(d) {
      var dummy = _template.renderDummy();
      $emplacement.append(dummy);
    }


  }

  // Exporting
  //===========
  window.DeckModule = DeckModule;
})(jQuery, window);
