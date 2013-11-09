/*
| -------------------------------------------------------------------
|  MTGNode Playground Hand Module
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
  function HandModule(_side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(_side),
        _identifier = '#'+_side+'_',
        _template = new CardTemplate(_side);

    // Selectors
    var $game_area = $('#game_block'),
        $emplacement = $('#'+_area+'_hand'),
        $deck = $('#'+_area+'_deck');

    // Properties
    //------------
    this.baseOffset = 77;
    this.offset = this.baseOffset;
    this.cards = '.card-min.in-hand.'+_side;
    this.width = $emplacement.width();
    this.left = $emplacement.position().left;

    // Emettor
    //---------
    if (_side === 'my') {

      // Droppable
      $emplacement.droppable({
        tolerance: 'fit',
        drop: function(e, ui) {
          var $card = $(ui.draggable);

          if ($card.hasClass('in-hand')) {

            // Reorganizing hand
            _this.reorganize();
            _this.dispatchEvent('sendRealtimeMessage', {
              head: 'opReorganizeHand'
            });
          }
        }
      });
    }

    // Receptor
    //----------

    // Drawing card
    this.triggers.events[_side+'CardDrawn'] = function(d, e) {
      var card = e.data;

      // Adding card in dom
      $game_area.append(card.html);
      var $card = $(_identifier+card.id);

      // Position
      var p = {left: $deck.position().left};
      p[_area] = 0;
      $card.css(p);

      // Animating cards
      _this.reorganize();

      // Flipping card if mine and make draggable
      if (_side === 'my') {
        $card.removeClass('flipped');
        Helpers.registerDraggable($card, function(e, ui) {
          var $card = $(ui.helper);

          // Updating z index
          Helpers.updateZ($card);

          // Retrieving position and sending to opponent
          var pos = {
            left: ui.position.left,
            top: ui.position.top,
            zindex: $card.css('z-index'),
            id: $card.attr('number')
          };

          _this.dispatchEvent('sendRealtimeMessage', {
            head: 'opCardDragged',
            body: pos
          });
        });
      }
    }

    // Opponent reorganizes his hand
    this.triggers.events[_side+'ReorganizeHand'] = function(d, e) {
      _this.reorganize();
    }

    // Helpers
    //---------
    this.reorganize = function() {
      var $cards = $(this.cards);
      $cards.show();

      // Checking place in hand
      if($cards.length * this.offset > this.width-this.baseOffset){
        this.offset -= 10;
      }

      $($cards.get().reverse()).each(function(i){

        // Getting to position
        var to_position = _this.left + (_this.offset*i);

        // Updating z-index
        Helpers.updateZ($(this));

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
