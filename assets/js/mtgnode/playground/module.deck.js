/*
| -------------------------------------------------------------------
|  MTGNode Playground Deck Module
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  // Deck Module
  //=============
  function DeckModule(side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(side),
        _template = new CardTemplate(side);

    // Selectors
    var $emplacement = $('#'+_area+'_deck');

    // Emettor
    //---------
    if (side === 'my') {

      // Drawing a card
      $emplacement.on('click', '.card-dummy', function(){
        _this.dispatchEvent('myDrawCard');
      });
    }

    // Receptor
    //----------

    // Receiving cards
    this.triggers.events[side+'DeckSelected'] = function(d) {
      var dummy = _template.renderDummy();
      $emplacement.append(dummy);
    }

  }


  // Deck Hacks
  //============
  var _hacks = [
    {
      triggers: 'myDrawCard',
      method: function(e) {
        var deck = this.get('myDeck');

        // Finding first deck card
        var card_id = _.find(deck, function(c) {
          return c.flag === 'in-deck';
        }).id;

        // Modifying card and send it to hand
        deck[card_id].flag = 'in-hand';

        this.dispatchEvent('myCardDrawn', card_id);
      }
    }
  ];

  // Exporting
  //===========
  window.DeckModule = DeckModule;
  window.deckHacks = _hacks;
})(jQuery, window);
