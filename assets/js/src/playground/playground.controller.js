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

  function _m(fn, args) {
    _controller.addModule(fn, args);
  }

  // Basic Modules
  playground.modules = {
    realtime: _m(dominoRealtime.module),
    modals: {
      deckChoice: _m(playground.modules.modals.deckChoice)
    }
  };

  // Connecting to the game
  realtime.connect('/playground/' + GAME.id + '/connect');

  // Widgets
  $('#card_viewer_widget').cardViewerWidget({
    container: '#game_block',
    cards: '.card-min > img.front-side'
  });

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.controller', _controller);
}).call(this);
        