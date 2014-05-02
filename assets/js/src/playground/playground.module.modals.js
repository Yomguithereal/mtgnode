(function(undefined) {
  'use strict';

  /**
   * Playground Modals Modules
   * ==========================
   *
   * The modals to display to help the player in his choices.
   */

  // The modal enabling players to select his deck
  function DeckChoiceModal() {
    realtime.bootstrap(this);
    var _this = this;

    // Selectors
    var $modal = $('#deck_choice_modal'),
        $select = $('#deck_select'),
        $choice = $('#deck_validate');

    // Emettor
    //---------
    $choice.click(function() {

      var deck_id = $select.val();

      _this.dispatchBothEvents('deck.selected', {
        id: deck_id
      });

      $modal.modal('hide');
    });

    // Receptor
    //----------
    this.triggers.events['deck.choice'] = function(d) {

      // Showing modal
      $modal.modal('show');
    }
  }

  // The modal enabling players to search cards
  function SearchCardsModal() {
    realtime.bootstrap(this);
    var _this = this;

    // Selectors
    var $modal = $('#card_choice_modal'),
        $body = $modal.find('.modal-body'),
        $choice = $('#card_choice_validate');

    // Properties
    this.cards = '.card-search';
    this.searchedModel = null;

    // Card selection
    $modal.on('click', this.cards, function() {
      $(this).toggleClass('selected');
    });

    // Emitters
    $choice.click(function() {

      // Getting selected cards ids
      $(_this.cards + '.selected').each(function() {
        _this.dispatchEvent('card.move', {
          id: +$(this).attr('index'),
          side: 'my',
          to: 'hand',
          from: _this.searchedModel,
          event: (_this.searchedModel === 'library') ? 'card.drawn' : false
        });
      });

      // Closing the modal
      $modal.modal('hide');
    });

    // Receptors
    this.triggers.events['cards.search'] = function(d, e) {
      _this.searchedModel = e.data.model;
      var cards = d.get('my-' + _this.searchedModel);

      // Cleaning body
      $body.empty();

      // Filling body
      cards.map(function(c) {
        $body.append(c.searchHtml);
      });

      // Showing modal
      $modal.modal('show');
    };
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.modules.modals', {
    deckChoice: DeckChoiceModal,
    cardsSearch: SearchCardsModal
  });
}).call(this);
