module.exports.routes = {

  // Basic routes
  '/': {controller: 'Login', action: 'login'},
  '/lobby': {controller: 'Lobby', action: 'lobby'},

  // Card Database API
  '/card/:id': {controller: 'Card', action: 'single_card'},
  'POST /card': {controller: 'Card', action: 'batch_cards'},
  '/set/:id': {controller: 'Set', action: 'single_set'},
  '/set/:id/cards': {controller: 'Set', action: 'set_cards'},
  '/sets': {controller: 'Set', action: 'every_set'},

  // Ajax Routes
  '/ajax/login/authenticate': {controller: 'Login', action: 'authenticate'},

  // Debug Routes
  '/database/dump': {controller: 'Debug', action: 'dump'}
};
