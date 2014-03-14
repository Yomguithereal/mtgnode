(function(undefined) {
  'use strict';

  /**
   * MTGNode Namespace
   * ==================
   *
   * Register some global configuration.
   */
  var _config = {
    domino: {
      verbose: true
    }
  };

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('mtgnode.globals', _config);
}).call(this);
