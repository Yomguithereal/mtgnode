/*
| -------------------------------------------------------------------
| MTGNode Playground Interface Module
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  // Card Counters Module
  //======================
  function CountersModule(_side) {
    domino.module.call(this);
    var _this = this,
        _area = Helpers.getArea(_side);

    // Selectors
    var $block = $('#'+_area+'_helper_block');

    var $counters = {};
    $counters.Deck = $block.find('.deck-counter'),
    $counters.Hand = $block.find('.hand-counter'),
    $counters.Graveyard = $block.find('.graveyard-counter');
    $counters.Battlefield = $block.find('.battlefield-counter');
    $counters.Exile = $block.find('.exile-counter');

    // Receptor
    //----------

    // Updating counters
    var models = ['Deck', 'Hand', 'Battlefield', 'Exile', 'Graveyard'];
    models.map(function(m) {
      _this.triggers.events[_side+m+'Updated'] = function(d) {
        $counters[m].text(d.get(_side+m).length);
      }
    });
  }

  // Hitpoints and Infection Module
  //================================
  function PointsModule(_side, _property, params) {
    domino.module.call(this);
    var _this = this,
        _area = Helpers.getArea(_side);

    // Selectors
    var $block = $('#'+_area+'_helper_block'),
        $counter = $block.find(params.counter),
        $updater = $block.find(params.updater);

    // Emettor
    //---------

    if (_side === 'my') {

      // Updating Points
      $updater.click(function(){
        var o = $(this).hasClass('gain');

        _this.dispatchEvent('myUpdatePoints', {
          property: _property,
          operation: o
        });
        _this.dispatchEvent('sendRealtimeMessage', {
          head: 'opUpdatePoints',
          body: {
            property: _property,
            operation: o
          }
        });
      });
    }

    // Receptor
    //----------

    // Updating points
    this.triggers.events[_side+_property+'Updated'] = function(d) {
      $counter.text(d.get(_side+_property));
    }
  }

  // Chat Module
  //=============
  function ChatModule() {
    domino.module.call(this);
    var _this = this;

    // Selectors
    var $trigger = $('#chat_trigger'),
        $chat = $('#chat_container'),
        $messages = $('#chat_messages'),
        $new_message = $('#chat_new_message'),
        $send = $('#chat_send');

    // Make draggable
    $chat.draggable();

    // Opening chat
    $trigger.click(function() {
      $chat.removeClass('hide');
    });

    // Emettor
    //---------
    $new_message.keypress(function(e) {
      if (e.which === 13) {
        e.preventDefault();
        $send.trigger('click');
      }
    });

    $send.click(function() {
      var message = $new_message.val();

      if (message === '')
        return false;

      // Dispatching event
      _this.dispatchEvent('chatMessage', {
        message: message,
        author: 'my'
      });

      _this.dispatchEvent('sendRealtimeMessage', {
        head: 'chatMessage',
        body: {
          message: message,
          author: 'op'
        }
      })

      // Emptying
      $new_message.val('');
    });

    // Receptor
    //---------
    this.triggers.events['chatMessage'] = function(d, e) {
      var username = d.get(e.data.author + 'User').username,
          kls = (e.data.author === 'my') ? 'text-primary' : 'text-danger';

      $messages.append(
        '<strong class="' + kls + '">' + username + '</strong> :' +
        e.data.message +
        '<br>'
      );

      $messages.animate({
        scrollTop: $messages[0].scrollHeight
      });
    }

  }

  // Interface Hacks
  //=================
  var _hacks = [
    {
      triggers: 'myUpdatePoints',
      method: function(e) {
        var points = this.get('my' + e.data.property);

        if (e.data.operation)
          this['my' + e.data.property] = points + 1;
        else
          this['my' + e.data.property] = points - 1;
      }
    },
    {
      triggers: 'opUpdatePoints',
      method: function(e) {
        var points = this.get('op' + e.data.property);

        if (e.data.operation)
          this['op' + e.data.property] = points + 1;
        else
          this['op' + e.data.property] = points - 1;
      }
    },
    {
      triggers: 'chatMessage'
    }
  ];

  // Exporting
  //===========
  window.InterfaceModules = {
    counters: CountersModule,
    points: PointsModule,
    chat: ChatModule
  };
  window.interfaceHacks = _hacks;
})(jQuery, window);
