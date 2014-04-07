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

    // Drop events
    this.drop = {
      tolerance: 'intersect',
      to: function($card) {
        this.slurp($card, {add: 'flipped', remove: ''}, function() {
          console.log('ici');
          $card.remove();
        });
      }
    };

    // Dummy card to display?
    this.onUpdate = function(cards) {

      // Case when the deck might be empty
      if (!cards.length)
        _this.$area.empty();
      else
        if (!_this.$area.children().length)
          _this.$area.append(_this.dummy);
    };

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.library', Library);
}).call(this);
