/**
 * SetController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var set_library = require('../libraries/Set');

module.exports = {
  single_set: function(req, res) {
    var wanted_set = req.param('id'),
        setInfo = set_library.getSetInfo(wanted_set);

    if (!setInfo)
      res.notFound();
    else
      res.json(setInfo);
  },
  every_set: function(req, res) {
    res.json(set_library.getSetsInfo());
  },
  set_cards: function(req, res) {
    var wanted_set = req.param('id');

    if (set_library.getSetInfo(wanted_set))
      res.json(set_library.getCards(wanted_set));
    else
      res.notFound();
  }
};
