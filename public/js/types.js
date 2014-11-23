/**
 * MTGNode Data Types
 * ===================
 *
 * Miscellaneous 'typology' definitions used throughout the application.
 */
var types = require('domino-js').types;

// User
types.add('User', {
  name: 'string',
  decks: 'array'
});
