/**
 * Views Global Configuration
 */
var config = require('../../config/mtgnode');

module.exports = function (req, res, ok) {

  // Card Display Driver
  res.locals.CARD_DRIVER = config.driver;

  // Handlebars scripts
  res.locals.TEMPLATE_MIME = 'text/x-handlebars-template';

  // Lang for the driver
  res.locals.LANG = config.lang;

  // Session relevant information
  if (req.session.authenticated)
    res.locals.SESSION = {
      uid: req.session.user.id,
      username: req.session.user.username
    }

  return ok();
};
