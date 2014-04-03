(function(undefined) {
  'use strict';

  /**
   * Playground Namespace
   * =====================
   *
   * Register some global configuration.
   */
  var _config = {},
      _drivers = {
        my: new mtgnode.driver('my'),
        op: new mtgnode.driver('op')
      };

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.config', _config);
  utilities.pkg('playground.drivers', _drivers);
}).call(this);
