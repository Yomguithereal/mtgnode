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

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.graveyard', Graveyard);
}).call(this);
