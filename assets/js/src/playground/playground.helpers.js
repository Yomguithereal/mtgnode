(function(undefined) {
  'use strict';

  /**
   * Playground Helpers
   * ===================
   *
   */

  // Helpers namespace
  var _helpers = {

    // Converts an array of names into an array of domino hacks
    toHacks: function(array) {
      return array.map(function(e) {
        return {triggers: e};
      });
    },
    addToHacks: function(array) {
      playground.hacks = playground.hacks.concat(array);
    },
    overloadCards: function(driver, cards, side) {
      return cards.map(function(card, i) {

        // Unique id
        card.id = i;

        // Side
        card.side = side;

        // Html
        card.html = driver.render(card, card.id);
        card.search_html = driver.renderSearch(card, card.id);

        return card;
      });
    },
    fromTo:   function (d, from, to, id) {
      var fromModel = d.get(from),
          toModel = d.get(to);

      // Returning false if the model is empty
      if (fromModel.length === 0)
        return false;

      // Finding first card
      if (id === undefined) {
        var card = fromModel.shift();
      }
      else {
        var card = _.remove(fromModel, function(c) {
          return c.id === id;
        })[0];
      }

      toModel.unshift(card);

      // Updating model
      d[from] = fromModel;
      d[to] = toModel;

      return card;
    }
  };

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.helpers', _helpers);
}).call(this);
