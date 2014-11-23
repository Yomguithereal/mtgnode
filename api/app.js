/**
 * MTGNode Express Application
 * ============================
 *
 * Main application serving the REST API.
 */
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    middlewares = require('./middlewares.js'),
    validate = middlewares.validate,
    compendium = require('./model/compendium.js'),
    fs = require('fs');

/**
 * Application definition
 */
var app = express();
if (process.env.NODE_ENV !== 'test')
  app.use(morgan('dev'));

app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(cookieParser());
app.use(session({
  secret: 'shawarma',
  trustProxy: false,
  resave: true,
  saveUninitialized: true
}));

/**
 * Home & Static
 */
app.get('/', function(req, res) {
  fs.readFile(__dirname + '/../index.html', 'utf-8', function(err, data) {
    return res.status(200).send(data);
  });
});

app.use('/public', express.static(__dirname + '/../public'));


/**
 * Cards Router
 */
var cardsRouter = express.Router();

// Retrieving a single card by id
cardsRouter.get('/card/:id',
  validate({id: 'string'}),
  function(req, res) {
    var card = compendium.getCardById(+req.param('id'));

    if (!card)
      return res.status(404).send('Not Found');
    else
      return res.json(card);
  }
);

// Retrieving a batch of cards by id
cardsRouter.post('/cards',
  validate({cards: 'array'}),
  function(req, res) {
    return res.json(compendium.getCardsById(req.param('cards')));
  }
);


/**
 * Registrations
 */
app.use(cardsRouter);


/**
 * Exporting
 */
module.exports = app;
