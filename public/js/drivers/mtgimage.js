/**
 * MTGNode mtgimage driver
 * ========================
 *
 * Retrieving an card's image url on mtgimage.com
 */

var urls = {
  multiverseid: 'http://mtgimage.com/multiverseid/',
  cardname: 'http://mtgimage.com/set/'
};

module.exports = function(card) {
  if (card.multiverseid)
    return `${urls.multiverseid}${card.multiverseid}.jpg`;
  else
    return `${urls.cardname}${card.set}/${card.name}.jpg`;
};
