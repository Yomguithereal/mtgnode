/**
 * MTGNode Main Controller
 * ========================
 *
 * Main domino controller driving the application
 */
var domino = require('domino-js'),
    Baobab = require('baobab'),
    types = require('../types.js'),
    services = require('../services.js');

// Registering state
var state = new Baobab({

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
});

// Controller
var controller = new domino({
  services: services
});

// Overiding controller methods
// TODO: just dev override to test baobab
controller.select = state.select.bind(state);
controller.get = state.get.bind(state);
controller.set = state.set.bind(state);
controller.update = state.update.bind(state);
controller.mixin = state.mixin;
controller.state = state;

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
