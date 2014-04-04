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
  var areas = ['library', 'hand', 'exile', 'graveyard', 'battlefield'];

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

  // Delayed Modules
  function DelayedModules() {
    domino.module.call(this);

    this.triggers.events['modules.delayed'] = function() {
      
      // Registering areas for both my and op side
      areas.map(function(area) {
        playground.modules.areas.my[area] = _m(playground.areas[area], ['my']);
        playground.modules.areas.op[area] = _m(playground.areas[area], ['op']);
      });
    };
  }

  // Basic Modules
  playground.modules = {
    areas: {
      my: {},
      op: {}
    },
    delayed: _m(DelayedModules),
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
        