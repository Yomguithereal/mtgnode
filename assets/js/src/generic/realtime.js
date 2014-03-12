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
  var _realtime = {
    connect: function(url, cb) {
      socket.get(url, cb);
    },
    send: function(message) {
      // TODO
    },
    domino: function() {
      // TODO
      domino.module.call(this);
      var _this = this;

      socket.on('message', function(e) {
        _this.dispatchEvent('realtime.message', e.data);
      });
    }
  };

  /**
   * Exporting
   * ----------
   */
  this.realtime = _realtime;
  this.socket = socket;
}).call(this);
