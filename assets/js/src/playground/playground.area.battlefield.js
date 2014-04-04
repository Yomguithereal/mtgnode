(function(undefined) {
  'use strict';

  /**
   * Playground Battelfield Area
   * ============================
   *
   */
  function Battelfield() {
    var _this = this,
        _name = 'battelfield';

    // Extending
    playground.area.call(this, _name);

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.battelfield', Battelfield);
}).call(this);
