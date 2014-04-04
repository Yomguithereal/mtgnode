(function(undefined) {
  'use strict';

  /**
   * Playground Graveyard Area
   * ========================
   *
   */
  function Graveyard() {
    var _this = this,
        _name = 'graveyard';

    // Extending
    playground.area.call(this, _name);

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.graveyard', Graveyard);
}).call(this);
