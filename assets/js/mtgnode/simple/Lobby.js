// Lobby simple interactions
$(document).ready(function(){

    // Variables
    //----------
    var $host_game = $("#host_game");
    var $game_name = $("#host_game_name");
    var $game_list = $("#game_list");
    var counter = 1;


    // Events
    //-------

    // Fetching Games
    socket.get('/game', function(games){
        counter += games.length;
        games.forEach(function(game){
            $game_list.append(_renderListItem(game));
        });
    });

    // Updating Games
    socket.on('message', function(message){
        counter += 1;
        $game_list.append(_renderListItem(message.data));
    });

    // Hosting a Game
    $host_game.click(function(){
        var name = $game_name.val();
        if($.trim(name) === '')
            return false;

        // TODO :: Fix this hacky part when sails get fixed
        socket.post('/game/create', {name: name});
        location.href = '/playground/'+String(counter);
    });



    // Helpers
    //--------

    // Render game list
    function _renderListItem(game){
        return '<li game_id="'+game.id+'" >'+game.name+'</li>';
    }

});