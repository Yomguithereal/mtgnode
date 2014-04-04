(function(undefined) {
  'use strict';

  /**
   * Playground Areas Abstraction
   * =============================
   *
   */
  var baseZ = 30,
      maxZ = 30;

  function Area(side) {
    domino.mtgnode.call(this);
    var _this = this;

    // Properties
    this.side = side;
    this.maxZ = maxZ;
    this.driver = playground.drivers[this.side];
    this.pos = this.side === 'my' ? 'bottom' : 'top';
    this.cards = '.card-min.in-' + this.name + '.' + this.side;

    // Selectors
    this.$context = $('#' + this.name + '_context_menu');
    this.$area = $('#' + this.pos + '_' + this.name);

    // Methods
    this.init = function() {

      // Workflow
      if (this.side === 'my' && sidethis.emitters !== undefined)
        this.emitters();
    };

    this.moveTo = function(area, id) {
      this.dispatchEvent('card.move', {
        side: 'my',
        from: this.name,
        to: area,
        id: id
      });
    };

    this.updateZ = function($card) {
      if ($card.hasClass('enchantment') &&
          $card.hasClass('ui-draggable-dragging'))
        $card.css('z-index', this.maxZ);
      else
        $card.css('z-index', ++this.maxZ);
    };

    this.selectCard = function(card) {
      return $('#' + this.side + '_' + card.id);
    };

    this.onUpdate = function(fn) {
      var e = this.side + '-' + this.name + '.updated';

      this.triggers.events[e] = function(d, e) {
        var cards = d.get(this.side + '-' + this.name);
        fn(cards);
      };
    }

    this.onEvent = function(name, fn) {
      this.triggers.events[name] = function(d, e) {
        if (e.side === _this.side)
          fn(d, e);
      };
    };
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.area', Area);
}).call(this);
