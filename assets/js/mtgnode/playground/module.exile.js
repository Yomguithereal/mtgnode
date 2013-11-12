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

          // Interactions
          var interactions = [
            {
              class: 'in-game',
              event: 'myExileCard'
            },
            {
              class: 'in-hand',
              event: 'myAnnihilateCard'
            },
            {
              class: 'in-graveyard',
              event: 'myCremateCard'
            }
          ];

          for (var i = 0; i < interactions.length; i++) {
            if ($card.hasClass(interactions[i].class)) {
              _this.dispatchEvent(interactions[i].event, {
                id: +$card.attr('number')
              });

              break;
            }
          }
        }
      });
    }

    // Receptor
    //----------

    // From Battlefield to Exile
    function standardSlurp(d, e) {
      _this.slurp(e.data.id);
    }

    this.triggers.events[_side+'ExileCard'] = standardSlurp;
    this.triggers.events[_side+'CremateCard'] = standardSlurp;

    // From Hand to Exile
    this.triggers.events[_side+'AnnihilateCard'] = function(d, e) {
      _this.slurp(e.data.id);
      _this.dispatchEvent(_side+'ReorganizeHand');
    }

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
  _hacks = _hacks
    .concat(Helpers.fromToHacks(
      'Battlefield',
      'Exile',
      'ExileCard'
    ))
    .concat(Helpers.fromToHacks(
      'Hand',
      'Exile',
      'AnnihilateCard'
    ))
    .concat(Helpers.fromToHacks(
      'Graveyard',
      'Exile',
      'CremateCard'
    ));

  // Exporting
  //===========
  window.ExileModule = ExileModule;
  window.exileHacks = _hacks;
})(jQuery, window);
