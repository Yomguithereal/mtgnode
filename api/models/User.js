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
    decks: function(cb) {
      Deck.find({user_id: this.id}, cb);
    }
  },
  authenticate: function(username, password, cb) {
    this.findOne({username: username, password: password}, function(err, u) {
      cb(err, u);
    });
  }
};
