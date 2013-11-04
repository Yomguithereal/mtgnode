/*
| -------------------------------------------------------------------
|  MTGNode Playground Properties
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  var _properties = [

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
      {
        id: 'myHand',
        type: 'array',
        value: [],
        dispatch: 'myHandUpdated'
      },
      {
        id: 'myBattlefield',
        type: 'array',
        value: [],
        dispatch: 'myBattlefieldUpdated'
      },
      {
        id: 'myGraveyard',
        type: 'array',
        value: [],
        dispatch: 'myGraveyardUpdated'
      },
      {
        id: 'myExile',
        type: 'array',
        value: [],
        dispatch: 'myExileUpdated'
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
      },
      {
        id: 'opHand',
        type: 'array',
        value: [],
        dispatch: 'opHandUpdated'
      },
      {
        id: 'opBattlefield',
        type: 'array',
        value: [],
        dispatch: 'opBattlefieldUpdated'
      },
      {
        id: 'opGraveyard',
        type: 'array',
        value: [],
        dispatch: 'opGraveyardUpdated'
      },
      {
        id: 'opExile',
        type: 'array',
        value: [],
        dispatch: 'opExileUpdated'
      }
    ];

  // Exporting
  //===========
  window.playgroundProperties = _properties;
})(jQuery, window);
