/**
 * LobbyController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
module.exports = {
  lobby: function(req, res) {
    res.view('lobby/lobby');
  }
};
