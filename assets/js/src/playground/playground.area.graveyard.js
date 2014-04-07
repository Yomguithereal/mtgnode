(function(undefined) {
  'use strict';

  /**
   * Playground Graveyard Area
   * ========================
   *
   */
  function Graveyard(side) {
    var _this = this;
    this.name = 'graveyard';

    // Extending
    playground.area.call(this, side);

    // Drop events
    this.drop = {
      tolerance: 'intersect',
      to: function($card) {
        this.slurp($card);
      }
    };

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.graveyard', Graveyard);
}).call(this);
