/*
| -------------------------------------------------------------------
|  MTGNode Playground Exile Module
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
  function ExileModule(_side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(_side),
        _cardSelector = Helpers.getCardSelectorFunc(_side),
        _template = new CardTemplate(_side);

    // Selectors
    var $game_area = $('#game_block'),
        $emplacement = $('#'+_area+'_exile');

    // Properties
    //------------
    this.cards = '.card-min.in-exile.'+_side;
    this.top = (_area === 'top') ?
      0 :
      $game_area.height() - $emplacement.height();


    // Emettor
    //---------
    if (_side === 'my') {

      // Dropping card in game
      $emplacement.droppable({
        tolerance: 'intersect',
        drop: function(e, ui) {
          var $card = $(ui.draggable);

          // // From Game
          // if ($card.hasClass('in-game')) {
          //   _this.dispatchEvent('myBuryCard', {
          //     id: +$card.attr('number')
          //   });
          // }

          // // From Hand
          // else if ($card.hasClass('in-hand')) {
          //   _this.dispatchEvent('myDiscardCard', {
          //     id: +$card.attr('number')
          //   });
          // }
        }
      });
    }

    // Receptor
    //----------

    // // From Battlefield to Graveyard
    // this.triggers.events[_side+'BuriedCard'] = function(d, e) {
    //   _this.slurp(e.data.id);
    // }

    // // From Hand to Graveyard
    // this.triggers.events[_side+'DiscardedCard'] = function(d, e) {
    //   _this.slurp(e.data.id);
    //   _this.dispatchEvent(_side+'ReorganizeHand');
    // }

    // Helpers
    //---------
    this.slurp = function(id) {
      var $card = _cardSelector(id);

      $card.removeClass('in-game in-hand in-graveyard in-deck tapped flipped');
      $card.addClass('in-exile');

      $card.animate({
        left: $emplacement.position().left,
        top: this.top
      }, 'fast');
    }
  }


  // Deck Hacks
  //============
  var _hacks = [];

  // Exporting
  //===========
  window.ExileModule = ExileModule;
  window.exileHacks = _hacks;
})(jQuery, window);
