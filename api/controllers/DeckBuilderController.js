/*
| -------------------------------------------------------------------
|  MTGNode Deck Builder Controller
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/
var CardModel = require('../raw_models/CardModel'),
    SetModel = require('../raw_models/SetModel'),
    DeckModel = require('../raw_models/DeckModel');

// Index
//------
exports.builder = function(req, res){

  // Getting Relevant Data
  var data = {
    sets: SetModel.getSetInfos()
    ,decks : req.session.user.decks
  };

  // Rendering the view
  res.view('deck-builder/deck-builder', data);
}

// Get all cards from a Set
//-------------------------
exports.set_cards = function(req, res){

  // Sending back the cards
  res.json(SetModel.getCards(req.param('id')));
}

// Get cards from a deck
//----------------------
exports.deck_cards = function(req, res){

  // Sending back the cards
  res.json(DeckModel.getCards(req.session.user, req.param('id')));
}

// Search cards
//-------------
exports.search = function(req, res) {

  // Sending back the cards
  res.json(CardModel.searchByName(req.param('query')));
}

// Parse a deck
//-------------
exports.parse_deck = function(req, res) {

  // Sending back the cards
  var deck = JSON.parse(req.param('deck'));
  res.json(DeckModel.parse(deck.text, deck.format));
}

// Save a deck
//------------
exports.save_deck = function(req, res){

  var deck = JSON.parse(req.param('deck'));

  if(deck.id === undefined){
    User.addDeck(req.session.user, deck, function(updated_user, deck){
      req.session.user = updated_user;
      res.json({result: 'success', action: 'add', id: deck.id});
    });
  }
  else{
    User.updateDeck(req.session.user, deck, function(updated_user, deck){
      req.session.user = updated_user;
      res.json({result: 'success', action: 'update', id: deck.id});
    });
  }
}

// Delete a deck
//--------------
exports.delete_deck = function(req, res){
  User.deleteDeck(req.session.user, req.param('deck_id'), function(updated_user) {
    req.session.user = updated_user;
    res.json({result: 'success'});
  });
}