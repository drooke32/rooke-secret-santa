import React from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

class ListSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Aaron',
    };
  }

  handleChange = (event, index, value) => {
    this.setState({
      name: value,
    });

    Object.keys(this.props.people).map((key, index) => {
      if (this.props.people[key]['owner'] === value) {
        this.props.selectPerson(this.props.people[key]['list']);
      }
    });
  };

  renderItems = () => {
    let items = [];
    Object.keys(this.props.people).map((key, index) => {
      items.push(<MenuItem key={key} value={this.props.people[key]['owner']} primaryText={this.props.people[key]['owner']} />);
    });
    return items;
  }

  render() {
    return <SelectField 
      value={this.state.name}
      name="name"
      onChange={this.handleChange}
      fullWidth={true}
      maxHeight={200}
      className="list-selector"
    >
      { this.renderItems() }
    </SelectField>
  }
}

export default ListSelector;