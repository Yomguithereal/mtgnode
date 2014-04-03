(function(undefined) {
  'use strict';

  /**
   * Playground Domino Properties
   * =============================
   *
   * Properties registry
   */
  var _properties = [

      // Generic
      {
        id: 'gameId',
        type: 'number|string',
        value: GAME.id
      },
      {
        id: 'debug',
        type: 'boolean',
        value: DEBUG
      },

      // Me
      {
        id: 'my-side',
        type: 'number',
        value: 0
      },
      {
        id: 'my-user',
        type: 'object',
        value: {}
      },
      {
        id: 'my-deck',
        type: 'object',
        value: {},
        dispatch: 'my-deck.updated'
      },
      {
        id: 'my-hitpoints',
        type: 'number',
        value: 20,
        dispatch: 'my-hitpoints.updated'
      },
      {
        id: 'my-infection',
        type: 'number',
        value: 0,
        dispatch: 'my-infection.updated'
      },
      {
        id: 'my-turn',
        type: 'boolean',
        value: false,
        dispatch: 'my-turn.updated'
      },
      {
        id: 'my-library',
        type: 'array',
        value: [],
        dispatch: 'my-library.updated'
      },
      {
        id: 'my-hand',
        type: 'array',
        value: [],
        dispatch: 'my-hand.updated'
      },
      {
        id: 'my-battlefield',
        type: 'array',
        value: [],
        dispatch: 'my-battlefield.updated'
      },
      {
        id: 'my-graveyard',
        type: 'array',
        value: [],
        dispatch: 'my-graveyard.updated'
      },
      {
        id: 'my-exile',
        type: 'array',
        value: [],
        dispatch: 'my-exile.updated'
      },

      // Opponent
      {
        id: 'op-side',
        type: 'number',
        value: 0
      },
      {
        id: 'op-user',
        type: 'object',
        value: {}
      },
      {
        id: 'op-deck',
        type: 'object',
        value: {},
        dispatch: 'op-deck.updated'
      },
      {
        id: 'op-hitpoints',
        type: 'number',
        value: 20,
        dispatch: 'op-hitpoints.updated'
      },
      {
        id: 'op-infection',
        type: 'number',
        value: 0,
        dispatch: 'op-infection.updated'
      },
      {
        id: 'op-turn',
        type: 'boolean',
        value: false,
        dispatch: 'op-turn.updated'
      },
      {
        id: 'op-library',
        type: 'array',
        value: [],
        dispatch: 'op-library.updated'
      },
      {
        id: 'op-hand',
        type: 'array',
        value: [],
        dispatch: 'op-hand.updated'
      },
      {
        id: 'op-battlefield',
        type: 'array',
        value: [],
        dispatch: 'op-battlefield.updated'
      },
      {
        id: 'op-graveyard',
        type: 'array',
        value: [],
        dispatch: 'op-graveyard.updated'
      },
      {
        id: 'op-exile',
        type: 'array',
        value: [],
        dispatch: 'op-exile.updated'
      }
    ];

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.properties', _properties);
}).call(this);
