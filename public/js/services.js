/**
 * MTGNode Domino Services
 * ========================
 *
 * Services hitting MTGNode's API.
 */

var services = {
  retrieveUsers: {
    url: '/users',
    success: function(data) {
      this.update('users', data);
    }
  }
};

module.exports = services;
