(function(undefined) {
  'use strict';

  /**
   * Playground Exile Area
   * ======================
   *
   */
  function Exile() {
    var _this = this,
        _name = 'exile';

    // Extending
    playground.area.call(this, _name);

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.exile', Exile);
}).call(this);
