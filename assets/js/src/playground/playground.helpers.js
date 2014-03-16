(function(undefined) {
  'use strict';

  /**
   * Playground Helpers
   * ===================
   *
   */

  // Helpers namespace
  var _helpers = {

    // Converts an array of names into an array of domino hacks
    toHacks: function(array) {
      return array.map(function(e) {
        return {triggers: e};
      });
    },
    addToHacks: function(array) {
      playground.hacks = playground.hacks.concat(array);
    }
  };

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.helpers', _helpers);
}).call(this);
