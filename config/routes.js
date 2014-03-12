module.exports.routes = {

  // Basic routes
  '/': {view: 'homepage'},

  // Card Database API
  '/card/:id': {controller: 'Card', action: 'single_card'},
  'POST /card': {controller: 'Card', action: 'batch_cards'},
  '/set/:id': {controller: 'Set', action: 'single_set'},
  '/set/:id/cards': {controller: 'Set', action: 'set_cards'},
  '/sets': {controller: 'Set', action: 'every_set'},

  // Debug Routes
  '/database/dump': {controller: 'Debug', action: 'dump'}
};
