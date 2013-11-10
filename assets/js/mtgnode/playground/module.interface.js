/*
| -------------------------------------------------------------------
|  MTGNode Playground Interface Module
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
  function InterfaceModule(_side) {
    domino.module.call(this);
    var _this = this;

    var _area = Helpers.getArea(_side);

    // Selectors
    var $block = $('#'+_area+'_helper_block'),
        $life_counter = $block.find('.life-counter'),
        $update_life = $block.find('.update-life');

    var $counters = {};
    $counters.Deck = $block.find('.deck-counter'),
    $counters.Hand = $block.find('.hand-counter'),
    $counters.Graveyard = $block.find('.graveyard-counter');
    $counters.Battlefield = $block.find('.battlefield-counter');
    $counters.Exile = $block.find('.exile-counter');


    // Emettor
    //---------

    if (_side === 'my') {

      // Updating life
      $update_life.click(function(){
        var o = $(this).hasClass('gain-life');

        _this.dispatchEvent('updateMyHitpoints', {operation: o});
        _this.dispatchEvent('sendRealtimeMessage', {
          head: 'updateOpHitpoints',
          body: {operation: o}
        });
      });
    }

    // Receptor
    //----------

    // Updating life
    this.triggers.events[_side+'HitpointsUpdated'] = function(d) {
      $life_counter.text(d.get(_side+'Hitpoints'));
    }

    // Updating counters
    var models = ['Deck', 'Hand', 'Battlefield', 'Exile', 'Graveyard'];
    models.map(function(m) {
      _this.triggers.events[_side+m+'Updated'] = function(d) {
        $counters[m].text(d.get(_side+m).length);
      }
    });
  }

  // Interface Hacks
  //=================
  var _hacks = [
    {
      triggers: 'updateMyHitpoints',
      method: function(e) {
        var hp = this.get('myHitpoints');

        if (e.data.operation)
          this.myHitpoints = hp + 1;
        else
          this.myHitpoints = hp - 1;
      }
    },
    {
      triggers: 'updateOpHitpoints',
      method: function(e) {
        var hp = this.get('opHitpoints');

        if (e.data.operation)
          this.opHitpoints = hp + 1;
        else
          this.opHitpoints = hp - 1;
      }
    }
  ];

  // Exporting
  //===========
  window.InterfaceModule = InterfaceModule;
  window.interfaceHacks = _hacks;
})(jQuery, window);
