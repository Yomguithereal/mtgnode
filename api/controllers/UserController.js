/**
 * UserController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */
var md5 = require('crypto').createHash('md5');

module.exports = {
  test_user: function(req, res){

    md5.update('TEST');
    User.create({
      username: 'Yomgui',
      password: 'test',
      decks: [
        {
          id: md5.digest('hex'),
          name: 'TEST',
          cards: [345, 567, 876]
        }
      ]
    }).done(function(err, user){
      if(err){
        res.json({error: err});
      }
      else{
        res.json({user: user});
      }
    });
  }
}
