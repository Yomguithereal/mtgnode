(function(undefined) {
  'use strict';

  /**
   * Playground Battelfield Area
   * ============================
   *
   */
  function Battelfield(side) {
    var _this = this;
    this.name = 'battelfield';

    // Extending
    playground.area.call(this, side);

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.battelfield', Battelfield);
}).call(this);
