(function(undefined) {
  'use strict';

  /**
   * Playground Areas Abstraction
   * =============================
   *
   */
  var $game = $('#game_block');

  function Area(side) {
    realtime.bootstrap(this);
    var _this = this;

    // Properties
    this.side = side;
    this.driver = playground.drivers[this.side];
    this.pos = this.side === 'my' ? 'bottom' : 'top';
    this.cards = '.card-min.in-' + this.name + '.' + this.side;
    this.updatedEvent = this.side + '-' + this.name + '.updated';

    // Selectors
    this.$game = $game;
    this.$context = $('#' + this.name + '_context_menu');
    this.$area = $('#' + this.pos + '_' + this.name);

    // TODO: context menu for cards and zone

    // Methods
    //---------
    this.init = function() {

      // My workflow
      if (this.side === 'my') {

        // Emitters
        utilities.optcall(this, this.emitters);

        // Droppable
        if (this.drop !== undefined)
          (this.drop.$sel || this.$area).droppable({

            // Basic tolerance
            tolerance: this.drop.tolerance || 'intersect',

            // Accept cards only
            accept: '.card-min',

            // General callback
            drop: function(e, ui) {
              var $card = $(ui.draggable),
                  cls = _.find($card.attr('class').split(' '), function(c) {
                    return c.slice(0, 3) === 'in-';
                  }).slice(3);

              // Case when the model is the same
              if (cls === _this.name && _this.drop.onSameArea !== undefined) {
                _this.dispatchBothEvents('card.dropped', {
                  type: 'same',
                  from: cls,
                  to: _this.name,
                  id: +$card.attr('number'),
                });
              }
              else {

                // Dispatching event
                _this.dispatchBothEvents('card.dropped', {
                  type: 'normal',
                  from: cls,
                  to: _this.name,
                  id: +$card.attr('number')
                });

                // Moving the card accordingly
                _this.moveFrom(cls, +$card.attr('number'));
              }
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

    this.selectCard = function(id) {
      return $('#' + this.side + '_' + id);
    };

    this.receive = function(name, fn) {
      this.triggers.events[name] = function(d, e) {
        if (e.data.side === _this.side)
          fn(d, e);
      };
    };

    this.bindOnCards = function(name, fn) {
      this.$game.on(name, this.cards, fn);
    }

    // Generic Receptors
    //-------------------

    // Linked model updated
    this.triggers.events[this.updatedEvent] = function(d, e) {
      var cards = d.get(_this.side + '-' + _this.name);
      utilities.optcall(_this, _this.onUpdate, cards);
    };

    // Card dropped in area
    this.triggers.events['card.dropped'] = function(d, e) {
      var $card = _this.selectCard(e.data.id);

      // Applying new classes to dropped elements
      $card.removeClass('in-' + e.data.from);
      $card.addClass('in-' + e.data.to);

      // Executing drop callbacks
      if (_this.drop === undefined)
        return;

      if (e.data.type === 'same')
        utilities.optcall(_this, _this.drop.onSameArea, $card);
      else
        if (_this.name === e.data.from)
          utilities.optcall(_this, _this.drop.from, $card);
        else if (_this.name === e.data.to)
          utilities.optcall(_this, _this.drop.to, $card);
    }

    // DOM Generic Manipulation
    //--------------------------
    this.slurp = function($card, classes, cb) {
      classes = classes || {};

      $card.addClass(classes.add || '');
      $card.removeClass(classes.remove || 'tapped flipped');

      $card.animate({
        left: this.$area.position().left,
        top: (this.pos === 'top') ?
          0 :
          this.$game.height() - this.$area.height()
      }, 'fast', cb);
    };
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.area', Area);
}).call(this);
