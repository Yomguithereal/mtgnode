(function(undefined) {
  'use strict';

  /**
   * Playground Hand Area
   * =====================
   *
   */
  function Hand() {
    var _this = this,
        _name = 'hand';

    // Extending
    playground.area.call(this, _name);

    // Selectors
    var $game = $('#game_block');
    this.my.$library = $('#bottom_library');
    this.op.$library = $('#top_library');

    // Properties
    this.revealed = false;
    this.baseOffset = 77;
    this.offset = this.baseOffset;

    // Helpers
    this.top = function(side) {
      return side === 'op' ? 0 : $game.height() - this.my.$library.height();
    };

    this.makeDraggable = function($card, fn) {
      var snap_zones = [
        '.hand-emplacement.bottom',
        '.game-emplacement.bottom',
        '.graveyard-emplacement.bottom',
        '.exile-emplacement.bottom'
      ];

      $card.draggable({
        containment: '.game-area',
        snap: snap_zones.join(', '),
        grid: [10, 10],
        drag: fn
      });

      $card.draggable('enable');
    };

    // DOM Manipulation
    //------------------
    function onDrag(e, ui) {
      var $card = $(ui.helper);

      // Update z index
      _this.updateZ($card);

      // Retrieving position and sending to opponent
      var pos = {
        left: ui.position.left,
        top: ui.position.top,
        zindex: $card.css('z-index'),
        id: $card.attr('number')
      };

      _this.dispatchRealtimeEvent('card.dragged', pos);
    }

    function drawCard(side, card) {

      // Appending to DOM
      var $card = $(card.html);
      $game.append($card);

      // Position
      $card.css({
        left: _this[side].$library.position().left,
        top: _this.top(side)
      });

      // Reorganizing
      reorganize(side);

      // Specific to my side
      if (side === 'my') {

        // Reveal the card
        $card.removeClass('flipped');

        // Register draggable
        _this.makeDraggable($card, onDrag);

      }
      else {

        // If hand is reavealed
        if (_this.reavealed)
          $card.removeClass('flipped');
      }
    }

    function reorganize(side) {
      var $cards = $(_this[side].cards);
      $cards.show();

      // Position
      var $area = _this[side].$area,
          width = $area.width(),
          left = $area.position().left,
          top = _this.top(side);

      // Is there place in the hand?
      if ($cards.length * _this.offset > width)
        _this.offset -= 10;

      $($cards.get().reverse()).each(function(i) {

        // Getting to position
        var to_position = left + _this.offset * i;

        // z-index
        _this.updateZ($(this));

        // Animating
        $(this).animate({
          left: to_position,
          top: top
        }, 'fast');
      });
    }

    // Receptors
    //-----------
    this.onUpdate(drawCard);

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.hand', Hand);
}).call(this);
