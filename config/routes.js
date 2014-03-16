module.exports.routes = {

  // Basic routes
  '/': {controller: 'Login', action: 'login'},
  '/lobby': {controller: 'Lobby', action: 'lobby'},
  '/deck-builder': {controller: 'DeckBuilder', action: 'builder'},
  '/playground': {controller: 'Playground', action: 'playground'},

  // Card Database API
  '/card/:id': {controller: 'Card', action: 'single_card'},
  'POST /cards': {controller: 'Card', action: 'batch_cards'},
  '/cards/search': {controller: 'Card', action: 'search'},
  '/set/:id': {controller: 'Set', action: 'single_set'},
  '/set/:id/cards': {controller: 'Set', action: 'set_cards'},
  '/sets': {controller: 'Set', action: 'every_set'},

  // Ajax Routes
  '/ajax/login/authenticate': {controller: 'Login', action: 'authenticate'},

  // Rest specific routes
  '/user/:id/decks': {controller: 'User', action: 'decks'},
  '/deck/:id/detail': {controller: 'Deck', action: 'detail'},
  'POST /deck/parse': {controller: 'Deck', action: 'parse'},

  // Realtime routes
  '/game/get_and_clean': {controller: 'Game', action: 'get_and_clean'},

  // Debug Routes
  '/database/dump': {controller: 'Debug', action: 'dump'}
};
