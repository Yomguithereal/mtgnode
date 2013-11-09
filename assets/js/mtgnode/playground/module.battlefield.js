/*
| -------------------------------------------------------------------
|  MTGNode Playground Battlefield Module
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  'use strict';

  // Deck Module
  //=============
  function BattlefieldModule(_side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(_side),
        _identifier = '#'+_side+'_',
        _template = new CardTemplate(_side);

    // Selectors
    var $game_area = $('#game_block');

    // Properties
    //------------
    this.height = $game_area.height();

    // Emettor
    //---------
    if (_side === 'my') {


    }

    // Receptor
    //----------

    // Opponent dragged a card
    this.triggers.events['opCardDragged'] = function(d, e) {
      var $card = $('#op_'+e.data.id);

      $card.css({
        top: _this.height - e.data.top - $card.height(),
        left: e.data.left,
        'z-index': e.data.zindex
      });
    }

  }


  // Deck Hacks
  //============
  var _hacks = [];

  // Exporting
  //===========
  window.BattlefieldModule = BattlefieldModule;
  window.battlefieldHacks = _hacks;
})(jQuery, window);
