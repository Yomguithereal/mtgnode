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
      $sel: $('.game-emplacement'),
      to: function($card) {
        $card.removeClass('flipped');
      }
    };

    // Emitters
    //----------

    this.emitters = function() {

      // Tapping the cards
      this.bindOnCards('click', function() {
        _this.dispatchBothEvents('card.tapped', {id: $(this).attr('number')});
      });
    };

    // Receptors
    //-----------

    // TODO: faire un module cards?
    this.triggers.events['card.tapped'] = function(d, e) {
      if (e.data.side !== _this.side)
        return;

      var $card = _this.selectCard(e.data.id);
      $card.toggleClass('tapped');
    };

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  playground.helpers.addToHacks(['card.tapped']);
  utilities.pkg('playground.areas.battlefield', Battlefield);
}).call(this);
