// Lobby simple interactions
$(document).ready(function() {

  // Variables
  //----------
  var $host_game = $("#host_game"),
      $game_name = $("#host_game_name"),
      $game_list = $("#game_list");


  // Events
  //-------

  // Fetching Games
  socket.get('/game/get_and_clean', function(games) {
    console.log(games);
    games.forEach(function(game){
      $game_list.append(_renderListItem(game));
    });
  });

  // Adding and Deleting Games
  socket.on('message', function(message) {

    // Verb condition
    if(message.verb == 'create')
      _renderListItem(message.data);
    else if(message.verb == 'destroy')
      _destroyListItem(message.id);
  });

  // Hosting a Game
  $host_game.click(function() {
    var name = $game_name.val();
    if($.trim(name) === '')
      return false;

    socket.post('/game/create', {name: name}, function(game){
      location.href = '/playground/' + game.id;
    });
  });



  // Helpers
  //--------

  // Render game list
  function _renderListItem(game) {
    $game_list.append(
      '<li game_id="' +
      game.id +
      '" ><a href="/playground/' +
      game.id + '">' + game.name + '</a></li>');
  }


  // Destroy list item
  function _destroyListItem(id) {
    $("[game_id=" + id + "]").remove();
  }
});
