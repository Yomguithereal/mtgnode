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

    // Selectors
    var $modal = $('#deck_choice_modal'),
        $select = $('#deck_select'),
        $choice = $('#deck_validate');

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

  // Exporting
  //===========
  window.Modals = {
    deckChoice: DeckChoiceModule
  }
})(jQuery, window);
