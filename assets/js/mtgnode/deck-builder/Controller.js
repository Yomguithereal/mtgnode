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
  "use strict";

  // Domino Settings
  //=================
  domino.settings({
    // verbose: true,
    // displayTime: true,
    // mergeRequests: false
  });

  // Domino Helpers
  //================
  function cardsToMultiverseIdArray(cards){
    return cards.map(function(card){
      return card.multiverseid;
    });
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
        url: 'ajax/deck-builder/set/:set'
      },
      {
        id: 'getDeckCards',
        setter: 'deckCards',
        url: 'ajax/deck-builder/deck/:deck_id'
      },
      {
        id: 'saveDeck',
        url: 'ajax/deck-builder/save_deck',
        type: 'POST',
        dataType: 'json'
      },
      {
        id: 'deleteDeck',
        url: 'ajax/deck-builder/delete_deck',
        type: 'POST'
      }
    ]
    ,hacks: [
      {
        triggers: 'setSelected',
        method: function(event){
          this.request('getSetCards', {
            shortcuts: {
              set: event.data
            }
          });
        }
      },
      {
        triggers: 'deckSelected',
        method: function(event){
          this.request('getDeckCards', {
            shortcuts: {
              deck_id: event.data.deck
            }
          });
          this.deckId = event.data.deck;
          this.deckName = event.data.name;
        }
      },
      {
        triggers: 'deckCardAdded',
        method: function(event){
          var deckCards = this.get('deckCards');
          var addedCard = this.get('viewedCards')[event.data];
          deckCards.push(addedCard);
          this.deckCards = deckCards;
        }
      },
      {
        triggers: 'deckCardRemoved',
        method: function(event){
          var deckCards = this.get('deckCards');
          deckCards.splice(event.data, 1);
          this.deckCards = deckCards;
        }
      },
      {
        triggers: 'saveDeck',
        method: function(event){

          // Need to do it ?
          var deckCards = this.get('deckCards');
          if (deckCards.length === 0 || this.get('deckName') === undefined)
            return false;

          // Calling service
          this.request('saveDeck', {
            data: {
              deck: JSON.stringify({
                cards: cardsToMultiverseIdArray(deckCards),
                name: this.get('deckName'),
                id: this.get('deckId')
              }),
            }
          });
        }
      },
      {
        triggers: 'deleteDeck',
        method: function(event){

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

  // Template Engine
  //=================
  var __leftTemplate = new CardTemplate('leftcard');
  var __rightTemplate = new CardTemplate('rightcard');

  // Left Panel
  //==============
  function LeftPanel(){
    domino.module.call(this);

    // Variables
    var self = this;
    var cards = '.card-min-deckbuilder';
    var $set_select = $("#set_select");
    var $panel = $('#left_panel');

    // Emettor
    //------------
    $set_select.change(function(){
      var set = $(this).val();

      if(set != '-none-'){
        self.dispatchEvent('setSelected', set);
      }
    });

    $panel.on('click', cards, function(){
      self.dispatchEvent('deckCardAdded', $(this).attr('index'));
    });

    // Receptor
    //----------
    this.triggers.events['viewedCardsUpdated'] = function(d){
      $panel.empty();
      d.get('viewedCards').forEach(function(card, index){
        $panel.append(__leftTemplate.render(card, index));
      });
    }
  }

  // Right Panel
  //==============
  function RightPanel(){
    domino.module.call(this);

    // Variables
    var self = this;
    var cards = '.card-min-deckbuilder';
    var $deck_select = $('#deck_select');
    var $panel = $("#right_panel");

    // Emettor
    //------------
    $deck_select.change(function(){
      var deck = $(this).val();
      var name = $(this).children(':selected').text();
      if(deck != '-none-'){
        self.dispatchEvent('deckSelected', {deck: deck, name: name});
      }
    });

    $panel.on('click', cards, function(){
      self.dispatchEvent('deckCardRemoved', $(this).attr('index'));
    });

    // Receptor
    //------------
    this.triggers.events['deckCardsUpdated'] = function(d){
      $panel.empty();
      d.get('deckCards').forEach(function(card, index){
        $panel.append(__rightTemplate.render(card, index));
      });
    }
  }

  // Controls
  //===========
  function Controls(){
    domino.module.call(this);

    // Variables
    var self = this;
    var $counter = $("#card_counter");
    var $deck_name = $("#deck_name");
    var $save_deck = $("#save_deck");
    var $delete_deck = $("#delete_deck_modal_confirm");

    // Emettor
    //------------
    $deck_name.change(function(){
      self.dispatchEvent('updateDeckName', {deckName: $(this).val()});
    });

    $save_deck.click(function(){
      self.dispatchEvent('saveDeck');
    });

    $delete_deck.click(function(){
      self.dispatchEvent('deleteDeck');
    });

    // Receptor
    //------------
    this.triggers.events['deckCardsUpdated'] = function(d){
      $counter.text(d.get('deckCards').length);
    }

    this.triggers.events['deckNameUpdated'] = function(d){
      $deck_name.val(d.get('deckName'));
    }
  }

  // Launching
  //==============

  // Instanciating Modules
  var leftPanel = controller.addModule(LeftPanel);
  var rightPanel = controller.addModule(RightPanel);
  var controls = controller.addModule(Controls);

  // Instanciating Widgets
  $('#card_viewer_widget').cardViewerWidget({
    container: '#deck_builder_container',
    cards: '.card-min-deckbuilder'
  });


})(jQuery, window, domino, CardTemplate);