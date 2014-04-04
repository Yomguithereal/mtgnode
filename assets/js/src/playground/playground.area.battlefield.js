(function(undefined) {
  'use strict';

  /**
   * Playground Battlefield Area
   * ============================
   *
   */
  function Battlefield(side) {
    var _this = this;
    this.name = 'battlefield';

    // Extending
    playground.area.call(this, side);

    // Drop events
    this.drop = {
      tolerance: 'intersect',
      $sel: $('.game-emplacement')
    };

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.battlefield', Battlefield);
}).call(this);
