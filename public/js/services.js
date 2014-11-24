/**
 * MTGNode Domino Services
 * ========================
 *
 * Services hitting MTGNode's API.
 */

var services = {

  // Retrieve a list of existant users
  retrieveUsers: {
    url: '/users',
    success: function(data) {
      this.update('users', data);
    }
  },

  // Log into the system
  log: {
    url: '/log/:name',
    success: function(data) {
      this.update('user', data);
    }
  }
};

module.exports = services;
