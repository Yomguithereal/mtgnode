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
        _cardSelector = Helpers.getCardSelectorFunc(_side),
        _dummy = _template.renderDummy();

    // Selectors
    var $emplacement = $('#'+_area+'_deck'),
        $menu = $('#deck_context_menu');


    // Emettor
    //---------
    if (_side === 'my') {

      // Drawing a card
      $emplacement.on('click', '.card-dummy', function() {
        _this.dispatchEvent('myDrawCard');
      });

      // Dropping a card on deck
      $emplacement.droppable({
        tolerance: 'intersect',
        drop: function(e, ui) {

          Helpers.dropEvents({
            card: $(ui.draggable),
            domino: _this,
            interactions: [
              {
                class: 'in-hand',
                event: 'myDeckenCard'
              },
              {
                class: 'in-game',
                event: 'myTopCard'
              },
              {
                class: 'in-graveyard',
                event: 'mySaveCard'
              },
              {
                class: 'in-exile',
                event: 'myStrangeCard'
              }
            ]
          });
        }
      });

      // Contextual Menu
      $menu.contextualize({
        selector: '#'+_area+'_deck',
        actions: {
          drawHand: function() {

            // TODO: this is dirty!
            for(var i = 0; i < 7; i++) {
              setTimeout(function() {
                _this.dispatchEvent('myDrawCard');
              }, i * 200);
            }
          },
          searchCards: function() {
            _this.dispatchEvent('searchCards', 'myDeck');
          }
        }
      });
    }

    // Receptor
    //----------

    // Deck selected
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

    // Back to deck
    this.triggers.events[_side+'DeckenCard'] = function(d, e) {
      _this.slurp(e.data.id);
      _this.dispatchEvent(_side+'ReorganizeHand');
    }

    function standardSlurp(d, e) {
      _this.slurp(e.data.id);
    }

    this.triggers.events[_side+'TopCard'] = standardSlurp;
    this.triggers.events[_side+'SaveCard'] = standardSlurp;
    this.triggers.events[_side+'StrangeCard'] = standardSlurp;

    // Helpers
    //---------
    this.slurp = function(id) {
      var $card = _cardSelector(id);

      $card.removeClass('in-game in-hand in-exile in-graveyard tapped flipped');

      $card.animate({
        left: $emplacement.position().left,
        top: this.top
      }, 'fast');

      $card.remove();
    }
  }


  // Deck Hacks
  //============
  var _hacks = [
    {
      triggers: 'myDrawCard',
      method: function(e) {
        var card;

        if (e.data.id !== undefined)
          card = Helpers.fromTo(this, 'myDeck', 'myHand', e.data.id);
        else
          card = Helpers.fromTo(this, 'myDeck', 'myHand');

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

  _hacks = _hacks
    .concat(Helpers.fromToHacks(
      'Hand',
      'Deck',
      'DeckenCard'
    ))
    .concat(Helpers.fromToHacks(
      'Battlefield',
      'Deck',
      'TopCard'
    ))
    .concat(Helpers.fromToHacks(
      'Graveyard',
      'Deck',
      'SaveCard'
    ))
    .concat(Helpers.fromToHacks(
      'Exile',
      'Deck',
      'StrangeCard'
    ));

  // Exporting
  //===========
  window.DeckModule = DeckModule;
  window.deckHacks = _hacks;
})(jQuery, window);
