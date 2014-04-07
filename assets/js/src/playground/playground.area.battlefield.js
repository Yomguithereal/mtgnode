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

    // Emitters
    //----------

    // Context menu
    this.menu = {
      area: {
        untapAll: function() {
          this.dispatchBothEvents('cards.untap');
        }
      }
    };

    // Drop events
    this.drop = {
      tolerance: 'intersect',
      $sel: $('.game-emplacement'),
      to: function($card) {
        $card.removeClass('flipped');
      }
    };

    // Basic
    this.emitters = function() {

      // Tapping the cards
      this.bindOnCards('click', function() {
        _this.dispatchBothEvents('card.tapped', {id: $(this).attr('number')});
      });
    };

    // Receptors
    //-----------

    // Tapping cards
    this.receive('card.tapped', function(d, e) {
      var $card = _this.selectCard(e.data.id);
      $card.toggleClass('tapped');
    });

    // Untapping every cards
    this.receive('cards.untap', function(d, e) {
      $(this.cards).removeClass('tapped');
    });

    this.init();
  }

  /**
   * Exporting
   * ----------
   */
  playground.helpers.addToHacks(['card.tapped']);
  utilities.pkg('playground.areas.battlefield', Battlefield);
}).call(this);
