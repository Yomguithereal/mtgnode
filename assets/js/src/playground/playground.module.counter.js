(function(undefined) {
  'use strict';

  /**
   * Playground Counter Module
   * ==========================
   *
   * Displaying the number of cards per area.
   */

  function Counter(model, side) {
    var _this = this,
        pos = side === 'my' ? 'bottom' : 'top';

    // Selectors
    var $block = $('#' + pos + '_helper_block'),
        $counter = $block.find('.' + model + '-counter');

    // Receptors
    function update(d, e) {
      $counter.text(d.get(side + '-' + model).length);
    }
    this.triggers.events[side + '-' + model + '.updated'] = update;
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.modules.counter', Counter);
}).call(this);
