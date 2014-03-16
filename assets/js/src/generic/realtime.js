(function(undefined) {
  'use strict';

  /**
   * Realtime Utilities
   * ===================
   *
   * Realtime abstraction to plug socket.io into domino.
   */

  // Connecting
  var socket = io.connect();

  // Functions namespace
  // TODO: generalize?
  var _realtime = {
    connect: function(url, cb) {
      socket.get(url, cb);
    },
    domino: function(game_id) {
      return {
        module: function() {
          domino.module.call(this);
          var _this = this;

          socket.on('message', function(e) {
            if (e.verb === 'update')
              _this.dispatchEvent('realtime.send', e.data);
          });
        },
        hacks: [
          {
            triggers: 'realtime.receive',
            method: function(e) {
              this.dispatchEvent(e.data.head, e.data.body);
            }
          },
          {
            triggers: 'realtime.send',
            method: function(e) {

              // Sending through socket
              socket.post('/playground/' + game_id + '/message', {
                id: this.get('gameId'),
                debug: this.get('debug'),
                head: e.data.head,
                body: (e.data.body !== undefined) ? e.data.body : null
              });
            }
          }
        ]
      };
    }
  };

  /**
   * Exporting
   * ----------
   */
  this.realtime = _realtime;
  this.socket = socket;
}).call(this);
