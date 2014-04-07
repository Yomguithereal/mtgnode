/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  decks: function(req, res) {
    User.findOne(req.param('id'), function(err, user) {
      user.decks(function(err, decks) {
        res.json(decks);
      });
    });
  }
};
