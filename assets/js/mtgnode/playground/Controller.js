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


  // Controller
  //============

  var controller = new domino({
    name: 'PlaygroundController',
    properties: [

      // Me
      {
        id: 'myHitpoints',
        type: 'integer',
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
        id: 'opponentHitpoints',
        type: 'integer',
        value: 20,
        dispatch: 'opponentHitpointsUpdated'
      },
      {
        id: 'opponentTurn',
        type: 'boolean',
        value: false,
        dispatch: 'opponentTurnUpdated'
      },
      {
        id: 'opponentDeck',
        type: 'array',
        value: [],
        dispatch: 'opponentDeckUpdated'
      }

    ],
    services: [],
    hacks: [
      {
        triggers: 'sendRealtimeMessage',
        method: function(e) {
          console.log(e);
        }
      },
      {
        triggers: 'receiveRealtimeMessage',
        method: function(e) {
          console.log(e);
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
      console.log(m);
      _this.dispatchEvent('receiveRealtimeMessage', m);
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
  var realtimeBootstrap = controller.addModule(RealtimeBootstrap);


})(jQuery, window, domino);