(function(undefined) {
  'use strict';

  /**
   * Playground Chat Module
   * =======================
   *
   * Enable the players to chat when playing.
   */
  function Chat() {
    realtime.bootstrap(this);

    var _this = this;

    // Selectors
    var $trigger = $('#chat_trigger'),
        $chat = $('#chat_container'),
        $messages = $('#chat_messages'),
        $new_message = $('#chat_new_message'),
        $send = $('#chat_send');

    // Make the modal draggable
    $chat.draggable();

    // Opening chat
    $trigger.click(function() {
      $chat.removeClass('hide');
    });

    // Emitters
    $new_message.keypress(function(e) {
      if (e.which === 13) {
        e.preventDefault();
        $send.trigger('click');
      }
    });

    $send.click(function(e) {
      var message = $.trim($new_message.val());

      if (!message)
        return;

      _this.dispatchBothEvents('chat.message', {
        message: message
      });

      // Emptying
      $new_message.val('');
    });

    // Receptors
    this.triggers.events['chat.message'] = function(d, e) {
      var username = d.get(e.data.side + '-user').username,
          cls = (e.data.side === 'my') ? 'text-primary' : 'text-danger';

      $messages.append(
        '<strong class="' + cls + '">' + username + '</strong> : ' +
        e.data.message +
        '<br>'
      );

      // Scrolling to bottom
      $messages.animate({
        scrollTop: $messages[0].scrollHeight
      });
    };
  }

  /**
   * Exporting
   * ----------
   */
  utilities.pkg('playground.modules.chat', Chat);
}).call(this);
