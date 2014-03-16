(function(undefined) {
  'use strict';

  /**
   * Playground Domino Services
   * =============================
   *
   * Services registry
   */
  var _services = [
    {
      id: 'getMyDeckCards',
      url: '/cards',
      type: 'POST',
      dataType: 'json',
      contentType: 'json',
      success: function(cards) {

        // Flag and index
        Helpers.flag(cards, 'my');
        this.myDeck = _.shuffle(cards);
      }
    },
    {
      id: 'getOpDeckCards',
      url: '/cards',
      type: 'POST',
      dataType: 'json',
      contentType: 'json',
      success: function(cards) {

        // Flag and index
        Helpers.flag(cards, 'op');
        this.opDeck = cards;
      }
    }
  ];

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.services', _services);
}).call(this);
