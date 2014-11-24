/**
 * MTGNode Lobby Picker
 * =====================
 *
 * This component renders the games' list and the menu leading to other pages.
 */
var React = require('react'),
    controller = require('../../controllers/main.js');

module.exports = React.createClass({
  render: function() {
    return <div>Hello Lobby!</div>;
  },
  statics: {
    willTransitionTo: function(transition) {
      if (!controller.get('logged'))
        return transition.redirect('/login');
    }
  }
});
