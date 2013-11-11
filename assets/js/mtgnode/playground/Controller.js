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
        var body = null;
        if (e.data.body !== undefined)
          body = e.data.body;

        socket.post(
          '/realtime/message',
          {
            id: this.get('gameId'),
            debug: this.get('debug'),
            head: e.data.head,
            body: body
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
    .concat(handHacks)
    .concat(battlefieldHacks)
    .concat(graveyardHacks)
    .concat(exileHacks);

  var controller = new domino({
    name: 'PlaygroundController',
    properties: playgroundProperties,
    hacks: _hacks,
    services: [
      {
        id: 'getMyDeckCards',
        url: '/cards',
        type: 'POST',
        dataType: 'json',
        success: function(cards) {

          // Flag and index
          Helpers.flag(cards, 'my');
          this.myDeck = _.shuffle(cards);
        }
      },
      {
        id: 'getOpDeckCards',
        url: '/cards',
        type: 'POST',
        dataType: 'json',
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
      var modulesToRegister = [
        DeckModule,
        HandModule,
        BattlefieldModule,
        GraveyardModule,
        ExileModule,
        InterfaceModule
      ];

      modulesToRegister.map(function(r) {
        _modules['my'+r.name] = controller.addModule(r, ['my']);
        _modules['op'+r.name] = controller.addModule(r, ['op']);
      });
    }
  }


  // Instanciation
  //===============

  // Widgets
  $('#card_viewer_widget').cardViewerWidget({
    container: '#game_block',
    cards: '.card-min > img.front-side'
  });

  // Modules
  _modules.realtime = controller.addModule(RealtimeBootstrap);
  _modules.start = controller.addModule(StartModule);
  _modules.delayed = controller.addModule(DelayedModules);
  _modules.deckChoice = controller.addModule(Modals.deckChoice);

})(jQuery, window, domino);
