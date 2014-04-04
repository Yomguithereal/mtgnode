(function(undefined) {
  'use strict';

  /**
   * Playground Points Module
   * =========================
   *
   * Keep track and update the hitpoints and infection points of each player.
   */

  function Points(type, side) {
    var _this = this,
        pos = side === 'my' ? 'bottom' : 'top';

    // Selectors
    var $block = $('#' + pos + '_helper_block'),
        $counter = $block.find(params.counter),
        $updater = $block.find(params.updater);
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.modules.points', Points);
}).call(this);
