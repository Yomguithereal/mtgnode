/*
| -------------------------------------------------------------------
|  MTGNode Playground Helpers
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  // Methods
  //=========
  function _getArea(side) {
    return (side === 'my') ? 'bottom' : 'top';
  }

  var _templates = {
    my: new CardTemplate('my'),
    op: new CardTemplate('op')
  }

  function _getTemplate(side) {
    return _templates[side];
  }

  function _flag(cards, side) {
    return cards.map(function(c, i) {

      // Unique card id
      c.id = i;

      // Card html
      c.html = _templates[side].render(c, c.id);
      return c;
    });
  }

  function _fromTo(d, from, to) {

    var fromModel = d.get(from);
    var toModel = d.get(to);

    // Finding first deck card
    var card = fromModel.shift();
    toModel.push(card);

    // Updating model
    d[from] = fromModel;
    d[to] = toModel;
  }

  // Exporting
  //===========
  window.Helpers = {

    // Misc
    getArea: _getArea,
    getTemplate: _getTemplate,
    flag: _flag,
    fromTo: _fromTo
  };
})(jQuery, window);
