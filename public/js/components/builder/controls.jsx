/**
 * MTGNode Deck Builder Controls Component
 * ========================================
 *
 * Component enabling the user to control the deck builder.
 */
var React = require('react'),
    {Well} = require('react-bootstrap'),
    CardViewer = require('../misc/card_viewer.jsx'),
    controller = require('../../controllers/main.js');

// Item of the set list
var SetListItem = React.createClass({
  renderOption: function(set) {
    return <option key={set.code} value={set.code}>{set.name}</option>;
  },
  render: function() {
    var group = this.props.group;

    return (
      <optgroup label={group.block}>
        {group.sets.map(this.renderOption)}
      </optgroup>
    );
  }
});

// List of existing sets
var SetList = React.createClass({
  mixins: [controller.mixin],
  cursor: ['data', 'sets'],
  handleChange: function(e) {
    var value = e.target.value;

    if (value !== 'no-choice')
      controller.emit('setCards:retrieve', value);
    else
      controller.select('builder', 'cards').set([]);
  },
  renderItem: function(data) {
    return <SetListItem key={data.block} group={data} />;
  },
  render: function() {
    return (
      <select onChange={this.handleChange} className='form-control'>
        <option value='no-choice'></option>
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
        <CardViewer />
      </Well>
    );
  }
});
