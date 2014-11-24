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
controller.on('route:update', function(e) {
  window.location.hash = e.data;
});

// Exporting
module.exports = controller;
