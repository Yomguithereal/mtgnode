(function(undefined) {
  'use strict';

  /**
   * Playground Exile Area
   * ======================
   *
   */
  function Exile(side) {
    var _this = this;
    this.name = 'exile';

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
  utilities.pkg('playground.areas.exile', Exile);
}).call(this);
