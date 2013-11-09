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
        _template = Helpers.getTemplate(_side);

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
        var card = Helpers.fromTo(this, 'myDeck', 'myHand');
        this.dispatchEvent('myCardDrawn', card);
        this.dispatchEvent('sendRealtimeMessage', {
          head: 'opDrawCard',
          body: card.id
        });
      }
    },
    {
      triggers: 'opDrawCard',
      method: function(e) {
        var card = Helpers.fromTo(this, 'opDeck', 'opHand', e.data);
        this.dispatchEvent('opCardDrawn', card);
      }
    }
  ];

  // Exporting
  //===========
  window.DeckModule = DeckModule;
  window.deckHacks = _hacks;
})(jQuery, window);
