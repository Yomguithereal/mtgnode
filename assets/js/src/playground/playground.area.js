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
    realtime.bootstrap(this);
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

      // My workflow
      if (this.side === 'my') {

        // Emitters
        if (this.emitters !== undefined)
          this.emitters();

        // Droppable
        if (this.drop !== undefined)
          (this.drop.$sel || this.$area).droppable({
            tolerance: this.drop.tolerance || 'intersect',
            drop: function(e, ui) {
              var $card = $(ui.draggable),
                  cls = _.find($card.attr('class').split(' '), function(c) {
                    return c.slice(0, 3) === 'in-';
                  }).slice(3);

              // Case when the model is the same
              if (cls === _this.name) {
                var shouldBreak = true;

                if (_this.drop.onSameArea !== undefined)
                  shouldBreak = !_this.drop.onSameArea($card);
                
                if (shouldBreak)
                  return false;
              }

              // Moving the card accordingly
              _this.moveFrom(cls, $card.attr('number'));

              // Updating classes
              $card.removeClass('in-' + cls);
              $card.addClass('in-' + _this.name);
            }
          });
      }
    };

    this.moveTo = function(area, id, e) {
      this.dispatchEvent('card.move', {
        side: 'my',
        from: this.name,
        to: area,
        id: id,
        event: e
      });
    };

    this.moveFrom = function(area, id, e) {
      this.dispatchEvent('card.move', {
        side: 'my',
        from: area,
        to: this.name,
        id: id,
        event: e
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
        var cards = d.get(_this.side + '-' + _this.name);
        fn(cards);
      };
    }

    this.onEvent = function(name, fn) {
      this.triggers.events[name] = function(d, e) {
        if (e.data.side === _this.side)
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
