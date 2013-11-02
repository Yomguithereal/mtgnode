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

    var _area = Helpers.getArea(side),
        _template = new CardTemplate(side);

    // Selectors
    var $emplacement = $('#'+_area+'_deck');

    // Emettor
    //---------
    if (side === 'my') {

      // Drawing a card

    }

    // Receptor
    //----------

    // Receiving cards
    this.triggers.events[side+'DeckSelected'] = function(d) {
      var dummy = _template.renderDummy();
      $emplacement.append(dummy);
    }

    this.triggers.events[side+'DeckUpdated'] = function(d) {
      console.log(d.get(side+'Deck'));
    }

  }

  // Exporting
  //===========
  window.DeckModule = DeckModule;
})(jQuery, window);
