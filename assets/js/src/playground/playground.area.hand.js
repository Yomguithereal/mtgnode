(function(undefined) {
  'use strict';

  /**
   * Playground Hand Area
   * =====================
   *
   */
  function Hand(side) {
    var _this = this;
    this.name = 'hand';

    // Extending
    playground.area.call(this, side);

    // Selectors
    this.$library = $('#' + this.pos + '_library');

    // Properties
    this.revealed = false;
    this.baseOffset = 77;
    this.offset = this.baseOffset;
    this.top = (side === 'op') ? 0 : this.$game.height() - this.$library.height();

    // DOM Manipulation
    //------------------
    function drawCard(d, e) {

      // Appending to DOM
      var $card = $(e.data.card.html);
      _this.$game.append($card);

      // Position
      $card.css({
        left: _this.$library.position().left,
        top: _this.top
      });

      // Reorganizing
      reorganize();

      // Specific to my side
      if (_this.side === 'my') {

        // Reveal the card
        $card.removeClass('flipped');

        // Register draggable
        playground.registers.drag.add($card);
      }
      else {

        // If hand is reavealed
        if (_this.reavealed)
          $card.removeClass('flipped');
      }
    }

    function reorganize() {
      var $cards = $(_this.cards);
      $cards.show();

      // Position
      var $area = _this.$area,
          width = $area.width(),
          left = $area.position().left,
          top = _this.top;

      // Is there place in the hand?
      if ($cards.length * _this.offset > width)
        _this.offset -= 10;

      $($cards.get().reverse()).each(function(i) {

        // Getting to position
        var to_position = left + _this.offset * i;

        // z-index
        playground.helpers.updateZ($(this));

        // Animating
        $(this).animate({
          left: to_position,
          top: top
        }, 'fast');
      });
    }

    // Emitters
    //----------
    this.drop = {
      tolerance: 'intersect',
      onSameArea: reorganize,
      to: function($card) {
        if (this.side === 'op') {
          $card.addClass('flipped');
        }

        $card.removeClass('tapped');
        reorganize();
      },
      from: reorganize
    };

    // Receptors
    //-----------
    this.receive('card.drawn', drawCard);

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.hand', Hand);
}).call(this);
