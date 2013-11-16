/*
| -------------------------------------------------------------------
|  MTGNode Playground Modals Modules
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  // Deck Choice
  //=============
  function DeckChoiceModule() {
    domino.module.call(this);
    var _this = this;

    // Selectors
    var $modal = $('#deck_choice_modal'),
        $select = $('#deck_select'),
        $choice = $('#deck_validate');

    // Emettor
    //---------
    $choice.click(function(){
      var deck_id = $select.val();
      _this.dispatchEvent('myDeckSelected', deck_id);
      _this.dispatchEvent('sendRealtimeMessage', {
        head: 'opDeckSelected',
        body: deck_id
      });

      $modal.modal('hide');
    });

    // Receptor
    //----------
    this.triggers.events['deckChoice'] = function(d) {

      // Populating deck select
      var decks = d.get('myUser').decks;
      decks.map(function(deck){
        $select.append('<option value="'+deck.id+'">'+deck.name+'</option>');
      });

      // Showing modal
      $modal.modal('show');
    }
  }

  // Card Search
  //=============
  function CardSearchModule() {
    domino.module.call(this);
    var _this = this;

    // Selectors
    var $modal = $('#card_choice_modal'),
        $body = $modal.find('.modal-body'),
        $choice = $('#card_choice_validate');

    // Properties
    this.cards = '.card-search';

    // Card Selection
    $body.on('click', this.cards, function() {
      $(this).toggleClass('selected');
    });

    // Emettor
    //---------

    $choice.click(function() {
      var cards = [],
          model = $(this).attr('model');

      $(_this.cards+'.selected').each(function() {
        cards.push(+$(this).attr('index'));
      });

      var events = {
        myDeck: 'myDrawCard',
        myGraveyard: 'myLootCard'
      };

      cards.map(function(id) {
        _this.dispatchEvent(events[model], {id: id});
      });

      $modal.modal('hide');
      $body.empty();
    });


    // Receptor
    //----------
    this.triggers.events['searchCards'] = function(d, e) {
      var cards = d.get(e.data);

      $body.empty();

      // Populating search
      cards.map(function(c) {
        $body.append(c.search_html);
      });

      $choice.attr('model', e.data);

      // Showing
      $modal.modal('show');
    }

  }

  // Modals Hacks
  //==============
  var _hacks = [
    {
      triggers: 'myDeckSelected',
      method: function(e) {
        var decks = this.get('myUser').decks;
        var cards = _.find(decks, function(d) {
          return d.id === e.data;
        }).cards;

        this.request('getMyDeckCards', {
          data: {
            deck: JSON.stringify({
              cards: cards
            })
          }
        });
      }
    },
    {
      triggers: 'opDeckSelected',
      method: function(e) {
        var decks = this.get('opUser').decks;
        var cards = _.find(decks, function(d) {
          return d.id === e.data;
        }).cards;

        this.request('getOpDeckCards', {
          data: {
            deck: JSON.stringify({
              cards: cards
            })
          }
        });
      }
    },
    {
      triggers: 'searchCards'
    }
  ];

  // Exporting
  //===========
  window.Modals = {
    deckChoice: DeckChoiceModule,
    cardSearch: CardSearchModule
  };

  window.modalsHacks = _hacks;
})(jQuery, window);
