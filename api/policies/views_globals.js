/**
 * Views Global Configuration
 */
module.exports = function (req, res, ok) {

	// Card Display Driver
	res.locals.CARD_DRIVER = 'magiccards.info';

	return ok();
};