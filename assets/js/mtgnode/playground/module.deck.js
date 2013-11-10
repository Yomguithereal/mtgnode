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
  function DeckModule(_side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(_side),
        _template = Helpers.getTemplate(_side),
        _dummy = _template.renderDummy();

    // Selectors
    var $emplacement = $('#'+_area+'_deck');

    // Emettor
    //---------
    if (_side === 'my') {

      // Drawing a card
      $emplacement.on('click', '.card-dummy', function() {
        _this.dispatchEvent('myDrawCard');
      });
    }

    // Receptor
    //----------

    // Receiving cards
    this.triggers.events[_side+'DeckSelected'] = function(d) {
      $emplacement.append(_dummy);
    }

    // Checking whether the deck still has cards
    this.triggers.events[_side+'DeckUpdated'] = function(d, e) {

      // Empty deck
      if (d.get(_side+'Deck').length === 0) {
        $emplacement.empty();
      }

      // Refurbushing
      else {
        if ($emplacement.children().length === 0) {
          $emplacement.append(_dummy);
        }
      }
    }
  }


  // Deck Hacks
  //============
  var _hacks = [
    {
      triggers: 'myDrawCard',
      method: function(e) {
        var card = Helpers.fromTo(this, 'myDeck', 'myHand');

        if (!card)
          return false;

        this.dispatchEvent('myCardDrawn', card);
        this.dispatchEvent('sendRealtimeMessage', {
          head: 'opDrawCard',
          body: {
            id: card.id
          }
        });
      }
    },
    {
      triggers: 'opDrawCard',
      method: function(e) {
        var card = Helpers.fromTo(this, 'opDeck', 'opHand', e.data.id);
        this.dispatchEvent('opCardDrawn', card);
      }
    }
  ];

  // Exporting
  //===========
  window.DeckModule = DeckModule;
  window.deckHacks = _hacks;
})(jQuery, window);
