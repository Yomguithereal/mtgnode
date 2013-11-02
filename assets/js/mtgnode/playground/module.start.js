/*
| -------------------------------------------------------------------
|  MTGNode Playground Start Module
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, undefined){
  "use strict";

  // Module
  //========
  function StartModule() {
    domino.module.call(this);
    var _this = this;

    // Constants
    //-----------
    var _id = $('#gid').val(),
        _debug = (_id === 'debug'),
        _connected = false;

    // Debug
    if (_debug) {
      socket.post('/game/create', {name: 'DEBUG', debug: true}, function(g) {
        _id = g.id;
        _connect();
      });
    }
    else {
      _connect();
    }

    // Test Button
    $('#card_viewer_widget').click(function() {
      _this.dispatchEvent('sendRealtimeMessage', {
        head: 'test',
        body: Math.random()
      });
    });


    // Functions
    //-----------
    function _connect(){
      socket.get('/playground/connect/'+_id, function(res){

      });
    }
  }

  // Exporting
  //===========
  window.StartModule = StartModule;
})(jQuery, window);
