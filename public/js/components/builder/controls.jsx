/**
 * MTGNode Deck Builder Controls Component
 * ========================================
 *
 * Component enabling the user to control the deck builder.
 */
var React = require('react'),
    {Well} = require('react-bootstrap'),
    controller = require('../../controllers/main.js');

// Item of the set list
var SetListItem = React.createClass({
  render: function() {
    return (
      <option value={this.props.code}>{this.props.name}</option>
    );
  }
});

// List of existing sets
var SetList = React.createClass({
  mixins: [controller.mixin],
  cursor: ['data', 'sets'],
  handleChange: function(e) {
    var value = e.target.value;
    console.log(value);
  },
  renderItem: function(data) {
    return <SetListItem key={data.code} code={data.code} name={data.name} />;
  },
  render: function() {
    return (
      <select onChange={this.handleChange} className='form-control'>
        <SetListItem key='choice' code={false} name='--Set--' />
        {this.cursor.get().map(this.renderItem)}
      </select>
    );
  }
});

// The component dealing with card search
var Search = React.createClass({
  render: function() {
    return (
      <div className='control-sm'>
        <SetList />
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function () {
    return (
      <Well className='full-height'>
        <Search />
      </Well>
    );
  }
});
