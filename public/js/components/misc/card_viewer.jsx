/**
 * MTGNode Card Viewer Component
 * ==============================
 *
 * A handy component enabling the user to zoom on a card to read it.
 */
var React = require('react'),
    driver = require('../../drivers/mtgimage.js'),
    controller = require('../../controllers/main.js');

module.exports = React.createClass({
  componentDidMount: function() {
    var self = this;

    this.__handler = function(e) {
      self.setState({card: e.data});
    };
    controller.on('card:focus', this.__handler);
  },
  componentWillUnmount: function () {
    controller.off('card:focus', this.__handler);
  },
  getInitialState: function() {
    return {card: null};
  },
  render: function() {
    var src = this.state.card ?
      driver(this.state.card) :
      'public/img/card-back.jpeg';

    return (
      <div class='card-viewer'>
        <img width={this.props.height || '222'} src={src} />
      </div>
    );
  }
});
