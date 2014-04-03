(function(undefined) {
  'use strict';

  /**
   * Playground Areas Abstraction
   * =============================
   *
   */
  function Area(id) {
    domino.mtgnode.call(this);
    var _this = this,
        _name = id;

    // Possibilities
    this.my = {
      $area: $('#bottom_' + _name)
    };
    this.op = {
      $area: $('#top_' + _name)
    };

    // Methods
    this.init = function() {

      // Workflow
      if (this.emitters !== undefined)
        this.emitters();
    };

    this.moveTo = function(area, id) {
      this.dispatchEvent('card.move', {
        side: 'my',
        from: _name,
        to: area,
        id: id
      });
    }

    this.onUpdate = function(fn) {

      this.triggers.events['my-' + _name + '.updated'] = function(d, e) {
        var card = d.get('my-' + _name)[0];
        fn('my', card);
      };

      this.triggers.events['op-' + _name + '.updated'] = function(d, e) {
        var card = d.get('op-' + _name)[0];
        fn('op', card);
      };
    }
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.area', Area);
}).call(this);
