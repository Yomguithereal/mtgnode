/*
| -------------------------------------------------------------------
|  MTGNode Playground Domino Controller
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function($, w, domino, CardTemplate, undefined){
  "use strict";


  // Controller
  //============

  var controller = new domino({
    name: 'PlaygroundController',
    properties: [],
    services: [],
    hacks: []
  });


  // Instanciating Widgets
  $('#card_viewer_widget').cardViewerWidget({container: '#deck_builder_container', cards: '.card-min'});










  // Debug

  var id = $('#playground_id').attr('value');
  console.log(id);

  socket.get('/playground/connect/'+id, function(res){
    console.log(res);
  });

  socket.on('message', function(m){
    console.log(m);
  });

})(jQuery, window, domino, CardTemplate);