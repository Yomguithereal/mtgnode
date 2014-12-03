/**
 * MTGNode Domino Services
 * ========================
 *
 * Services hitting MTGNode's API.
 */

var services = {

  /**
   * Cards API
   */

  // Retrieve set informations
  setsInformation: {
    url: '/sets',
    success: function(data) {
      this.select('data', 'sets').set(data);
    }
  },

  /**
   * Users API
   */

  // Retrieve a list of existant users
  retrieveUsers: {
    url: '/users',
    success: function(data) {
      this.select('data', 'users').set(data);
    }
  },

  // Log into the system
  log: {
    url: '/log/:name',
    success: function(data) {
      this.set('user', data);
      this.emit('route:update', '/lobby');
    }
  }
};

module.exports = services;
