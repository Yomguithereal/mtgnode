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

    this.triggers.events['opDeckUpdated'] = function(d) {
      console.log(d.get('opDeck'));
    }
  }

  // Exporting
  //===========
  window.Modals = {
    deckChoice: DeckChoiceModule
  }
})(jQuery, window);
