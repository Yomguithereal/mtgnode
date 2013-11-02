/*
| -------------------------------------------------------------------
|  MTGNode Playground Domino Controller
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, domino, undefined){
  "use strict";

  domino.settings({verbose: true});

  // Controller
  //============

  var controller = new domino({
    name: 'PlaygroundController',
    properties: [

      // Generic
      {
        id: 'gameId',
        type: 'number|string',
        value: 'debug'
      },
      {
        id: 'debug',
        type: 'boolean',
        value: false
      },

      // Me
      {
        id: 'mySide',
        type: 'number',
        value: 0
      },
      {
        id: 'myUser',
        type: 'object',
        value: {}
      },
      {
        id: 'myHitpoints',
        type: 'number',
        value: 20,
        dispatch: 'myHitpointsUpdated'
      },
      {
        id: 'myTurn',
        type: 'boolean',
        value: false,
        dispatch: 'myTurnUpdated'
      },
      {
        id: 'myDeck',
        type: 'array',
        value: [],
        dispatch: 'myDeckUpdated'
      },

      // Opponent
      {
        id: 'opSide',
        type: 'number',
        value: 0
      },
      {
        id: 'opUser',
        type: 'object',
        value: {}
      },
      {
        id: 'opHitpoints',
        type: 'number',
        value: 20,
        dispatch: 'opHitpointsUpdated'
      },
      {
        id: 'opTurn',
        type: 'boolean',
        value: false,
        dispatch: 'opTurnUpdated'
      },
      {
        id: 'opDeck',
        type: 'array',
        value: [],
        dispatch: 'opDeckUpdated'
      }

    ],
    services: [
      {
        id: 'getMyDeckCards',
        setter: 'myDeck',
        url: 'ajax/deck-builder/deck/:deck_id'
      },
      {
        id: 'getOpDeckCards',
        setter: 'opDeck',
        url: 'ajax/deck-builder/deck/:deck_id'
      }
    ],
    hacks: [
      {
        triggers: 'receiveRealtimeMessage',
        method: function(e) {

          // Rerouting event
          this.dispatchEvent(e.data.head, e.data.body);
        }
      },
      {
        triggers: 'sendRealtimeMessage',
        method: function(e) {
          socket.post(
            '/realtime/message',
            {
              id: this.get('gameId'),
              debug: this.get('debug'),
              head: e.data.head,
              body: e.data.body
            }
          );
        }
      },
      {
        triggers: 'startGame',
        method: function(e) {

          // Game basic info
          this.gameId = e.data.game.id;
          this.debug = e.data.game.debug;

          // Player Sides
          // TODO: this is dirty!
          var uid = +$('#uid').val();

          if (e.data.game.player1.user.id === uid) {
            this.mySide = 1;
            this.opSide = 2;
          }
          else {
            this.mySide = 2;
            this.opSide = 1;
          }

          this.myUser = e.data.game['player'+this.mySide].user;
          this.opUser = e.data.game['player'+this.opSide].user;

          // Passing to deck choice modal
          this.dispatchEvent('deckChoice');
        }
      }
    ]
  });


  // Realtime Bootstrap
  //====================
  function RealtimeBootstrap(){
    domino.module.call(this);

    var _this = this;

    socket.on('message', function(m) {
      if (m.verb === 'update')
        _this.dispatchEvent('receiveRealtimeMessage', m.data);
    });
  }


  // Instanciation
  //===============

  // Widgets
  $('#card_viewer_widget').cardViewerWidget({
    container: '#deck_builder_container',
    cards: '.card-min'
  });

  // Modules
  function registerModules(modules) {
    var modulesInstances = {};
    for(var key in modules) {
      modulesInstances[key] = controller.addModule(modules[key]);
    }

    return modulesInstances;
  }

  var modulesInstances = registerModules({
    realtime: RealtimeBootstrap,
    start: StartModule,
    deckChoice: Modals.deckChoice
  });

})(jQuery, window, domino);
