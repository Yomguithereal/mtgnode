(function(undefined) {
  'use strict';

  /**
   * Playground Points Module
   * =========================
   *
   * Keep track and update the hitpoints and infection points of each player.
   */
  function Points(type, side) {
    realtime.bootstrap(this);

    var _this = this,
        pos = side === 'my' ? 'bottom' : 'top',
        property = side + '-' + type;

    // Selectors
    var $block = $('#' + pos + '_helper_block'),
        $counter = $block.find('.' + type + '-counter'),
        $updater = $block.find('.update-' + type);

    // Emitters
    if (side === 'my')
      $updater.click(function() {
        _this.dispatchBothEvents('points.update', {
          increment: $(this).hasClass('gain'),
          model: type
        });
      });

    // Receptors
    this.triggers.events[property + '.updated'] = function(d, e) {
      $counter.text(d.get(property));
    };
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.modules.points', Points);
}).call(this);
