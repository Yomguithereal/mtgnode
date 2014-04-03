(function(undefined) {
  'use strict';

  /**
   * Playground Hand Area
   * =====================
   *
   */
  function Hand() {
    var _this = this,
        _name = 'hand';

    // Extending
    playground.area.call(this, _name);

    // Receptors
    //-----------
    this.onUpdate(function(side, card) {
      console.log(side, card);
    });

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.hand', Hand);
}).call(this);
