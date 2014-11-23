/**
 * User Model
 * ===========
 *
 * Interface with node-dirty database useful for storing users and their
 * associated data in a database-less fashion.
 */
var dirty = require('dirty'),
    types = require('typology'),
    uuid = require('uuid'),
    _ = require('lodash');

/**
 * Types
 */
types.add('deck', {
  card: ['number'],
  name: 'string',
  id: '?string'
});

/**
 * Abstract
 */
function Model(forTest) {

  // Connecting to db
  if (!forTest)
    this.db = dirty(__dirname + '/../../data/mtgnode.db');
  else
    this.db = dirty();
}

/**
 * Prototype
 */
Model.prototype.create = function(name, callback) {
  var def = {
    name: name,
    decks: []
  };

  this.db.set(name, def, function(err) {
    if (err) return callback(err);
    callback(null, def);
  });
};

Model.prototype.get = function(name) {
  return this.db.get(name);
};

Model.prototype.addDeck = function(name, deck, callback) {
  if (!types.check(deck, 'deck'))
    throw Error('mtgnode.user.addDeck: invalid deck.');

  var user = this.get(name);

  if (!user)
    throw Error('mtgnode.user.addDeck: inexistant user "' + user + '".');

  user.decks.push(_.merge(deck, {id: uuid.v4()}));

  this.db.set(name, user, callback);
};

module.exports = Model;
