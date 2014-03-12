/*
| -------------------------------------------------------------------
|  MTGNode User Model
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

module.exports = {
  attributes: {
    username: 'String',
    password: {
      type: 'String',
      defaultsTo: 'test'
    },
    decks: {
      type: 'Array',
      defaultsTo: []
    }
  }
};
