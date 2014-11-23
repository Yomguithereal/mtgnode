/**
 * MTGNode Express Application
 * ============================
 *
 * Main application serving the REST API.
 */
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    middlewares = require('./middlewares.js'),
    validate = middlewares.validate,
    compendium = require('./model/compendium.js');

// Defining application
var app = express();
if (process.env.NODE_ENV !== 'test')
  app.use(morgan('dev'));

app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb'}));

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

// Registering routers
app.use(cardsRouter);

// Exporting
module.exports = app;
