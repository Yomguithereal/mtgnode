/*
| -------------------------------------------------------------------
|  MTGNode App
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


// Loading dependencies
var express = require('express')
  , http = require('http')
  , path = require('path')
  , hub = require('./realtime/hub.js');

// Initializing the application
var app = express();

// Forcing Development mode
app.set('env', 'development');

// Instructions for all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('tezcatlipoca'));
app.use(express.session({secret : 'coatlicue'}));
app.use(function(req, res, next) {

  // Giving session access to the layout
  res.locals.session = req.session;

  // Configuring the driver base_url
  res.locals.CARD_BASE_URL = 'http://magiccards.info/scans/en/';

  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Dev only instructions
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  console.log('WARNING :: Development Mode');
}


// Routing
//--------

// Calling Controllers
var home = require('./controllers')
  , game = require('./controllers/game')
  , ajax = require('./controllers/ajax');

// Main routes
app.get('/', home.login);
app.get('/lobby', home.lobby);
app.get('/deck-builder', home.deckBuilder);

// Game routes
app.get('/game', game.index);

// Ajax
app.post('/ajax/login_attempt', ajax.loginAttempt);
app.post('/ajax/select_set', ajax.selectSet);
app.post('/ajax/specific_cards', ajax.specificCards);
app.post('/ajax/deck_cards', ajax.deckCards);
app.post('/ajax/save_deck', ajax.saveDeck);
app.post('/ajax/delete_deck', ajax.deleteDeck);
app.post('/ajax/update_deck', ajax.updateDeck);


// Server
var server = http.createServer(app);
var io = new hub(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// Database
//---------
var sqlite3 = require('sqlite3').verbose();
DB = new sqlite3.Database('./database/mtgnode.db');



