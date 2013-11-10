/*
| -------------------------------------------------------------------
|  MTGNode Playground Graveyard Module
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
  function GraveyardModule(_side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(_side),
        _cardSelector = Helpers.getCardSelectorFunc(_side),
        _template = new CardTemplate(_side);

    // Selectors
    var $game_area = $('#game_block'),
        $emplacement = $('#'+_area+'_graveyard');

    // Properties
    //------------
    this.cards = '.card-min.in-graveyard.'+_side;
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

          if ($card.hasClass('in-game')) {
            _this.dispatchEvent('myBuryCard', {
              id: +$card.attr('number')
            });
          }
        }
      });
    }

    // Receptor
    //----------

    // From game to graveyard
    this.triggers.events[_side+'BuriedCard'] = function (d, e) {
      var $card = _cardSelector(e.data.id);
      _this.slurp($card);
    }


    // Helpers
    //---------
    this.slurp = function($card) {
      $card.removeClass('in-game tapped');
      $card.addClass('in-graveyard');

      $card.animate({
        left: $emplacement.position().left,
        top: this.top
      }, 'fast');
    }
  }


  // Deck Hacks
  //============
  var _hacks = [];
  _hacks = _hacks
    .concat(Helpers.fromToHacks(
      'Battlefield',
      'Graveyard',
      'BuryCard',
      'BuriedCard'
    ));

  // Exporting
  //===========
  window.GraveyardModule = GraveyardModule;
  window.graveyardHacks = _hacks;
})(jQuery, window);
