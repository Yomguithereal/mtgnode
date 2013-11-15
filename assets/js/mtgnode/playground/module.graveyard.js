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

          Helpers.dropEvents({
            card: $(ui.draggable),
            domino: _this,
            interactions: [
              {
                class: 'in-game',
                event: 'myBuryCard'
              },
              {
                class: 'in-hand',
                event: 'myDiscardCard'
              }
            ]
          });
        }
      });
    }

    // Receptor
    //----------

    // From Battlefield to Graveyard
    this.triggers.events[_side+'BuryCard'] = function(d, e) {
      _this.slurp(e.data.id);
    }

    // From Hand to Graveyard
    this.triggers.events[_side+'DiscardCard'] = function(d, e) {
      _this.slurp(e.data.id);
      _this.dispatchEvent(_side+'ReorganizeHand');
    }

    // Helpers
    //---------
    this.slurp = function(id) {
      var $card = _cardSelector(id);

      $card.removeClass('in-game in-hand in-exile in-deck tapped flipped');
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
      'BuryCard'
    ))
    .concat(Helpers.fromToHacks(
      'Hand',
      'Graveyard',
      'DiscardCard'
    ));

  // Exporting
  //===========
  window.GraveyardModule = GraveyardModule;
  window.graveyardHacks = _hacks;
})(jQuery, window);
