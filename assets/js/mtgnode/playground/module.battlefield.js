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
        _cardSelector = Helpers.getCardSelectorFunc(_side),
        _template = new CardTemplate(_side);

    // Selectors
    var $game_area = $('.game-area'),
        $battlefield = $('.game-emplacement');

    // Properties
    //------------
    this.height = $game_area.height();
    this.cards = '.card-min.in-game.'+_side;

    // Emettor
    //---------
    if (_side === 'my') {

      // Dropping card in game
      $battlefield.droppable({
        tolerance: 'intersect',
        drop: function(e, ui) {
          var $card = $(ui.draggable);

          if ($card.hasClass('in-hand')) {
            _this.dispatchEvent('myPlayCard', {
              id: +$card.attr('number')
            });
          }
        }
      });
    }

    // Receptor
    //----------

    // Opponent dragged a card
    this.triggers.events[_side+'CardDragged'] = function(d, e) {
      var $card = _cardSelector(e.data.id);

      $card.css({
        top: _this.height - e.data.top - $card.height(),
        left: e.data.left,
        'z-index': e.data.zindex
      });
    }

    // Card Played
    this.triggers.events[_side+'PlayedCard'] = function(d, e) {
      var $card = _cardSelector(e.data.id);

      $card.removeClass('in-hand');
      $card.addClass('in-game');

      if (_side === 'op') {
        $card.removeClass('flipped');
      }

      _this.dispatchEvent('sendRealtimeMessage', {
        head: _side+'ReorganizeHand'
      });
    }
  }


  // Deck Hacks
  //============
  var _hacks = [];
  _hacks = _hacks
    .concat(Helpers.fromToHacks(
      'Hand',
      'Battlefield',
      'PlayCard',
      'PlayedCard'
    ));

  // Exporting
  //===========
  window.BattlefieldModule = BattlefieldModule;
  window.battlefieldHacks = _hacks;
})(jQuery, window);
