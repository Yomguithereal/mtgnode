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
  },
  authenticate: function(username, password, cb) {
    this.find({username: username, password: password}, function(err, u) {
      cb(err, u[0]);
    });
  }
};
