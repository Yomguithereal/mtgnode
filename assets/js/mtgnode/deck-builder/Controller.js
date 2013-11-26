/*
| -------------------------------------------------------------------
|  MTGNode DeckBuilder Domino Controller
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, domino, CardTemplate, undefined){
  'use strict';

  // Domino Settings
  //=================
  domino.settings({
    // verbose: true,
    // displayTime: true,
    // mergeRequests: false
  });

  // Helpers
  //=========
  var Helpers = {

    // Formatting card return array
    cardsToMultiverseIdArray: function(cards) {
      return cards.map(function(card){
        return card.multiverseid;
      });
    },

    // Alerting function
    $alert: $('.alert'),
    message: function(text, status) {
      status = status || 'success';

      this.$alert.removeClass('hide alert-danger alert-success');
      this.$alert.addClass('alert-' + status);
      this.$alert.children('.message').text(text);
    }
  }

  // Domino Instance
  //=================
  var controller = new domino({
    name: 'DeckBuilder',
    properties: [

      // Left Panel
      {
        id: 'viewedCards',
        value: [],
        label: 'Card viewed in the left panel.',
        type: 'array',
        dispatch: 'viewedCardsUpdated'
      },

      // Right Panel
      {
        id: 'deckCards',
        value: [],
        label: 'Card of the deck.',
        type: 'array',
        dispatch: 'deckCardsUpdated'
      },

      // Deck Name
      {
        id: 'deckName',
        label: 'Name of the current selected deck.',
        type: 'string',
        triggers: 'updateDeckName',
        dispatch: 'deckNameUpdated'
      },

      // Deck Id if any
      {
        id: 'deckId',
        label: 'Database id of the current selected deck.',
        type: 'string',
      }
    ]
    ,services: [
      {
        id: 'getSetCards',
        setter: 'viewedCards',
        url: '/ajax/deck-builder/set/:set'
      },
      {
        id: 'getDeckCards',
        setter: 'deckCards',
        url: '/ajax/deck-builder/deck/:deck_id'
      },
      {
        id: 'searchCards',
        setter: 'viewedCards',
        url: '/ajax/deck-builder/search',
        type: 'GET'
      },
      {
        id: 'saveDeck',
        url: '/ajax/deck-builder/save_deck',
        type: 'POST',
        dataType: 'json'
      },
      {
        id: 'deleteDeck',
        url: '/ajax/deck-builder/delete_deck',
        type: 'POST'
      }
    ]
    ,hacks: [
      {
        triggers: 'setSelected',
        method: function(e) {
          this.request('getSetCards', {
            shortcuts: {
              set: e.data
            }
          });
        }
      },
      {
        triggers: 'queryDone',
        method: function(e) {
          this.request('searchCards', {
            data: {
              query: e.data
            }
          });
        }
      },
      {
        triggers: 'deckSelected',
        method: function(e) {
          this.request('getDeckCards', {
            shortcuts: {
              deck_id: e.data.deck
            }
          });
          this.deckId = e.data.deck;
          this.deckName = e.data.name;
        }
      },
      {
        triggers: 'deckCardAdded',
        method: function(e) {
          var deckCards = this.get('deckCards');
          var addedCard = this.get('viewedCards')[e.data];
          deckCards.push(addedCard);
          this.deckCards = deckCards;
        }
      },
      {
        triggers: 'deckCardRemoved',
        method: function(e) {
          var deckCards = this.get('deckCards');
          deckCards.splice(e.data, 1);
          this.deckCards = deckCards;
        }
      },
      {
        triggers: 'saveDeck',
        method: function(e) {

          // Need to do it ?
          var deckCards = this.get('deckCards');
          if (deckCards.length === 0 || this.get('deckName') === undefined)
            return false;

          // Calling service
          this.request('saveDeck', {
            data: {
              deck: JSON.stringify({
                cards: Helpers.cardsToMultiverseIdArray(deckCards),
                name: this.get('deckName'),
                id: this.get('deckId')
              })
            }
          });
        }
      },
      {
        triggers: 'deleteDeck',
        method: function(e) {

          // Need to do it?
          var deckId = this.get('deckId');
          if (deckId === undefined)
            return false;

          // Calling service
          this.request('deleteDeck', {
            data: {
              deck_id: deckId
            }
          });
        }
      }
    ]
  });


  // Left Panel
  //============
  function LeftPanel(){
    domino.module.call(this);

    // Variables
    var _this = this,
        _template = new CardTemplate('leftcard'),
        _cards = '.card-min-deckbuilder';

    // Selectors
    var $set_select = $('#set_select'),
        $panel = $('#left_panel');

    // Emettor
    //---------
    $set_select.change(function() {
      var set = $(this).val();

      if(set != '-none-'){
        _this.dispatchEvent('setSelected', set);
      }
    });

    $panel.on('click', _cards, function(){
      _this.dispatchEvent('deckCardAdded', $(this).attr('index'));
    });

    // Receptor
    //----------
    this.triggers.events['viewedCardsUpdated'] = function(d){
      $panel.empty();
      d.get('viewedCards').forEach(function(card, index){
        $panel.append(_template.render(card, index));
      });
    }
  }

  // Right Panel
  //=============
  function RightPanel(){
    domino.module.call(this);

    // Variables
    var _this = this,
        _template = new CardTemplate('rightcard'),
        _cards = '.card-min-deckbuilder';

    // Selectors
    var $deck_select = $('#deck_select'),
        $panel = $('#right_panel');

    // Emettor
    //---------
    $deck_select.change(function(){
      var deck = $(this).val();
      var name = $(this).children(':selected').text();
      if(deck != '-none-'){
        _this.dispatchEvent('deckSelected', {deck: deck, name: name});
      }
    });

    $panel.on('click', _cards, function(){
      _this.dispatchEvent('deckCardRemoved', $(this).attr('index'));
    });

    // Receptor
    //----------
    this.triggers.events['deckCardsUpdated'] = function(d){
      $panel.empty();
      d.get('deckCards').forEach(function(card, index){
        $panel.append(_template.render(card, index));
      });
    }
  }

  // Controls
  //==========
  function Controls(){
    domino.module.call(this);

    // Variables
    var _this = this;

    // Selectors
    var $alert = $('.alert'),
        $counter = $('#card_counter'),
        $deck_name = $('#deck_name'),
        $save_deck = $('#save_deck'),
        $delete_deck = $('#delete_deck_modal_confirm'),
        $search = $('#card_search_button'),
        $query = $('#card_search');

    // Emettor
    //---------
    $deck_name.change(function() {
      _this.dispatchEvent('updateDeckName', {deckName: $(this).val()});
    });

    $save_deck.click(function() {
      _this.dispatchEvent('saveDeck');
    });

    $delete_deck.click(function() {
      _this.dispatchEvent('deleteDeck');
    });

    $query.keypress(function(e) {
      if (e.which === 13)
        $search.trigger('click');
    });

    $search.click(function() {
      var query = $query.val();

      if ($.trim(query) !== '') {
        $search.button('loading');
        _this.dispatchEvent('queryDone', $query.val());
      }
    });

    // Receptor
    //----------
    this.triggers.events['deckCardsUpdated'] = function(d) {
      $counter.text(d.get('deckCards').length);
    }

    this.triggers.events['deckNameUpdated'] = function(d) {
      $deck_name.val(d.get('deckName'));
    }

    this.triggers.events['viewedCardsUpdated'] = function(d) {
      var count = d.get('viewedCards').length;

      Helpers.message(count + ' cards found.', 'success');
      $search.button('reset');
    }
  }

  // Launching
  //===========

  // Instanciating Modules
  var leftPanel = controller.addModule(LeftPanel),
      rightPanel = controller.addModule(RightPanel),
      controls = controller.addModule(Controls);

  // Instanciating Widgets
  $('#card_viewer_widget').cardViewerWidget({
    container: '#deck_builder_container',
    cards: '.card-min-deckbuilder'
  });


})(jQuery, window, domino, CardTemplate);
