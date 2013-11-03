/*
| -------------------------------------------------------------------
|  MTGNode Playground DHandeck Module
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
  function HandModule(side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(side),
        _template = new CardTemplate(side);

    // Selectors
    var $emplacement = $('#'+_area+'_hand');

    // Emettor
    //---------
    if (side === 'my') {


    }

    // Receptor
    //----------

    // Drawing Card
    this.triggers.events[side+'CardDrawn'] = function(d, e) {
      var card = d.get(side+'Deck')[e.data];
      console.log(card);
    }

  }

  // Exporting
  //===========
  window.HandModule = HandModule;
})(jQuery, window);
