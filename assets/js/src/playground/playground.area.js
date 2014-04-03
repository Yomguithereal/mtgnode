(function(undefined) {
  'use strict';

  /**
   * Playground Areas Abstraction
   * =============================
   *
   */
  var baseZ = 30,
      maxZ = 30;

  function Area(id) {
    domino.mtgnode.call(this);
    var _this = this,
        _name = id;

    // Properties
    this.$context = $('#' + _name + '_context_menu');
    this.maxZ = maxZ;

    this.my = {
      $area: $('#bottom_' + _name),
      cards: '.card-min.in-' + _name + '.my'
    };
    this.op = {
      $area: $('#top_' + _name),
      cards: '.card-min.in-' + _name + '.op'
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
    };

    this.updateZ = function($card) {
      if ($card.hasClass('enchantment') &&
          $card.hasClass('ui-draggable-dragging'))
        $card.css('z-index', this.maxZ);
      else
        $card.css('z-index', ++this.maxZ);
    };

    this.selectCard = function(card) {
      return $('#' + card.side + '_' + card.id);
    };

    this.onUpdate = function(fn) {

      this.triggers.events['my-' + _name + '.updated'] = function(d, e) {
        var cards = d.get('my-' + _name);
        fn('my', cards[0], cards);
      };

      this.triggers.events['op-' + _name + '.updated'] = function(d, e) {
        var cards = d.get('op-' + _name);
        fn('op', cards[0], cards);
      };
    }
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.area', Area);
}).call(this);
