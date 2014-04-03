(function(undefined) {
  'use strict';

  /**
   * Playground Library Area
   * ========================
   *
   */
  function Library() {
    var _this = this,
        _name = 'library';

    // Extending
    playground.area.call(this, _name);

    // Properties
    this.dummy = playground.drivers.my.renderDummy();

    // Emitters
    //----------
    this.emitters = function() {

      // Clicking the library to draw a card
      this.my.$area.on('click', '.card-dummy', function() {

        _this.moveTo('hand');
      });
    };

    // Receptors
    //-----------
    this.triggers.events['deck.selected'] = function(d, e) {

      _this[e.data.side].$area.append(_this.dummy);
    };

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.areas.library', Library);
}).call(this);
