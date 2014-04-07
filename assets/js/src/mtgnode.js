(function(undefined) {
  'use strict';

  /**
   * MTGNode Namespace
   * ==================
   *
   * Register some global configuration.
   */
  var _config = {
    lang: 'en',
    domino: {
      verbose: true
    },
    realtime: {
      debug: false
    }
  };

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('mtgnode.config', _config);
}).call(this);
