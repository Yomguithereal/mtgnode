(function(undefined) {
  'use strict';

  /**
   * Playground Library Area
   * ========================
   *
   */
  function Library(side) {
    var _this = this;
    this.name = 'library';

    // Extending
    playground.area.call(this, side);

    // Properties
    this.dummy = this.driver.renderDummy();

    // Emitters
    //----------
    this.emitters = function() {

      // Clicking the library to draw a card
      this.$area.on('click', '.card-dummy', function() {

        _this.moveTo('hand', undefined, 'card.drawn');
      });
    };

    // Receptors
    //-----------

    // Contextual menu
    this.menu = {
      position: 'top',
      area: {
        drawHand: function() {
          
          // Clicking seven times on library
          var i = 1;
          (function draw() {
            $(_this.area + ' .card-dummy').click();
            if (i < 7)
              setTimeout(draw, 300);
            i++;
          })();
        },
        shuffle: function() {
          this.dispatchBothEvents('library.shuffle');
        }
      }
    };

    // Drop events
    this.drop = {
      tolerance: 'intersect',
      to: function($card) {
        this.slurp($card, {add: 'flipped', remove: ''}, function() {
          $card.remove();
        });
      }
    };

    // Dummy card to display?
    this.onUpdate = function(cards) {

      // Case when the deck might be empty
      if (!cards.length)
        this.$area.empty();
      else
        if (!this.$area.children().length)
          this.$area.append(this.dummy);
    };

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.library', Library);
}).call(this);
