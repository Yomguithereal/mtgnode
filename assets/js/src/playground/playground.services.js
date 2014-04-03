(function(undefined) {
  'use strict';

  /**
   * Playground Domino Services
   * ===========================
   *
   * Services registry
   */
  var _services = [
    {
      id: 'getMyDeckCards',
      url: '/deck/:id/detail',
      type: 'POST',
      dataType: 'json',
      contentType: 'json',
      success: function(deck) {
        this['my-deck'] = deck;
        this['my-library'] = _.shuffle(
          playground.helpers.overloadCards(
            playground.drivers.my,
            deck.cards
          )
        );
      }
    },
    {
      id: 'getOpDeckCards',
      url: '/deck/:id/detail',
      type: 'POST',
      dataType: 'json',
      contentType: 'json',
      success: function(deck) {
        this['op-deck'] = deck;
        this['op-library'] = playground.helpers.overloadCards(
          playground.drivers.op,
          deck.cards
        );
      }
    }
  ];

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.services', _services);
}).call(this);
