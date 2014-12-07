/**
 * MTGNode Main Controller
 * ========================
 *
 * Main domino controller driving the application
 */
var domino = require('domino-js'),
    types = require('../types.js'),
    services = require('../services.js');

// Controller
var controller = new domino({
  state: {

    // Current user
    user: SESSION.name ? SESSION : null,

    // Useful data
    data: {
      users: [],
      sets: []
    },

    // Deck builder
    builder: {
      cards: [],
      currentDeck: null
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

  // Data events
  'sets:retrieve': function() {
    if (!this.get('data', 'sets').length)
      this.request('setsInformation');
  },

  'setCards:retrieve': function(e) {
    this.request('setCards', {code: e.data});
  },

  // Login events
  'login:attempt': function(e) {
    this.request('log', {name: e.data.name});
  }
});

// Exporting
module.exports = controller;
