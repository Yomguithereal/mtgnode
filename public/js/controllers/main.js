/**
 * MTGNode Main Controller
 * ========================
 *
 * Main domino controller driving the application
 */
var domino = require('domino-js'),
    services = require('../services.js');

// Registering types
require('../types.js');

// Controller
var controller = new domino({
  properties: {
    user: {
      type: '?User',
      emit: 'user:updated',
      value: null
    },
    users: {
      type: 'array',
      emit: 'users:updated',
      value: []
    }
  },
  facets: {
    logged: function() {
      return !!this.get('user');
    }
  },
  services: services
});

// Events
controller.on({

  // Route events
  'route:update': function(e) {
    window.location.hash = e.data;
  },

  // Login events
  'login:attempt': function(e) {
    this.request('log', {name: e.data});
  },
  'user:updated': function(e) {

    // TODO: wait for answer concerning domino specs
  }
});

// Exporting
module.exports = controller;
