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
  'use strict';

  // Deck Module
  //=============
  function HandModule(side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(side),
        _identifier = '#'+side+'_',
        _template = new CardTemplate(side);

    // Selectors
    var $game_area = $('#game_block'),
        $emplacement = $('#'+_area+'_hand'),
        $deck = $('#'+_area+'_deck');

    // Properties
    //------------
    this.baseOffset = 77;
    this.offset = this.baseOffset;
    this.cards = '.card-min.in-hand.'+side;
    this.width = $emplacement.width();
    this.left = $emplacement.position().left;

    // Emettor
    //---------
    if (side === 'my') {


    }

    // Receptor
    //----------

    // Hand updated
    this.triggers.events[side+'CardDrawn'] = function(d, e) {
      var card = e.data;

      // Adding card in dom
      $game_area.prepend(card.html);

      // Flipping card if mine
      var $card = $(_identifier+card.id);
      if (side === 'my') {
        $card.removeClass('flipped');
      }

      // Animating cards
      _this.reorganize();
    }

    // Helpers
    //---------
    this.reorganize = function() {
      var $cards = $(this.cards);

      // Checking place in hand
      if($cards.length * this.offset > this.width-this.baseOffset){
        this.offset -= 10;
      }

      $($cards.get().reverse()).each(function(i){

        // Getting to position
        var to_position = _this.left + (_this.offset*i);

        // Updating z-index
        // self.helper.update_zindex($(this));

        // Animating the card
        $(this).animate({
          left: to_position
        }, 'fast');
      });
    }

  }


  // Deck Hacks
  //============
  var _hacks = [];

  // Exporting
  //===========
  window.HandModule = HandModule;
  window.handHacks = _hacks;
})(jQuery, window);
