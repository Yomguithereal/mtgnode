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
  var _modules = {};

  // Basic Hacks
  //=============
  var basicHacks = [
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

        // Instanciating delayed modules
        this.dispatchEvent('delayedModules');

        // Passing to deck choice modal
        this.dispatchEvent('deckChoice');
      }
    }
  ];

  // Controller
  //============

  var _hacks = basicHacks
    .concat(interfaceHacks)
    .concat(modalsHacks)
    .concat(deckHacks)
    .concat(handHacks);

  var controller = new domino({
    name: 'PlaygroundController',
    properties: playgroundProperties,
    hacks: _hacks,
    services: [
      {
        id: 'getMyDeckCards',
        url: '/ajax/playground/deck/:id',
        success: function(cards) {

          // Flag and index
          Helpers.flag(cards, 'my');
          this.myDeck = _.shuffle(cards);
        }
      },
      {
        id: 'getOpDeckCards',
        url: '/ajax/playground/deck/:id',
        success: function(cards) {

          // Flag and index
          Helpers.flag(cards, 'op');
          this.opDeck = cards;
        }
      }
    ]
  });


  // Realtime Bootstrap
  //====================
  function RealtimeBootstrap() {
    domino.module.call(this);

    var _this = this;

    socket.on('message', function(m) {
      if (m.verb === 'update')
        _this.dispatchEvent('receiveRealtimeMessage', m.data);
    });
  }

  // Delayed Module
  //================
  function DelayedModules() {
    domino.module.call(this);

    this.triggers.events['delayedModules'] = function(d) {

      // Registering game modules
      _modules.myDeck = controller.addModule(DeckModule, ['my']);
      _modules.opDeck = controller.addModule(DeckModule, ['op']);
      _modules.myHand = controller.addModule(HandModule, ['my']);
      _modules.opHand = controller.addModule(HandModule, ['op']);
      _modules.myHelpers = controller.addModule(InterfaceModule, ['my']);
      _modules.opHelpers = controller.addModule(InterfaceModule, ['op']);
    }
  }


  // Instanciation
  //===============

  // Widgets
  $('#card_viewer_widget').cardViewerWidget({
    container: '#deck_builder_container',
    cards: '.card-min'
  });

  // Modules
  _modules.realtime = controller.addModule(RealtimeBootstrap);
  _modules.start = controller.addModule(StartModule);
  _modules.delayed = controller.addModule(DelayedModules);
  _modules.deckChoice = controller.addModule(Modals.deckChoice);

})(jQuery, window, domino);
