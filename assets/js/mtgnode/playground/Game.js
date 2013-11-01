/*
| -------------------------------------------------------------------
|  MTGNode Playground Game Kernel
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";


  // Constants
  //===========
  var _id = $('#game').val(),
      _debug = (_id === 'debug'),
      _started = false;

  // Debug
  if (_debug) {
    socket.post('/game/create', {name: 'DEBUG'}, function(g) {
      _id = g.id;
      _start();
    });
  }
  else {
    _start();
  }

  // Test Button
  $('#card_viewer_widget').click(function() {
    _gameUpdate('test', Math.random());
  });


  // Functions
  //===========
  function _start(){
    socket.get('/playground/connect/'+_id, function(res){

    });
  }

  // Sending a message through socket io
  function _gameUpdate(message, data) {
    socket.post(
      '/realtime/message',
      {id: _id, debug: _debug, head: message, body: data},
      function(res) {

      }
    );
  }


  // Public API
  //============
  window.Game = {

    // Game properties
    id: _id,
    started: _started,

    // Misc Helpers
    helpers: {
      gameUpdate: _gameUpdate
    }
  }


})(jQuery, window);
