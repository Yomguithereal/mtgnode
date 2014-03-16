(function(undefined) {
  'use strict';

  /**
   * Playground Domino Controller
   * =============================
   *
   * Must be called last.
   */

  // Modules
  utilities.pkg('playground.modules');

  // Domino settings
  domino.settings(mtgnode.config.domino);

  // Realtime hacks
  var dominoRealtime = realtime.domino(GAME.id);
  playground.helpers.addToHacks(dominoRealtime.hacks);

  // Controller
  var _controller = new domino({
    properties: playground.properties,
    services: playground.services,
    hacks: playground.hacks
  });

  // Basic Modules
  playground.modules = _controller.addModule(dominoRealtime.module);

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.controller', _controller);
}).call(this);
