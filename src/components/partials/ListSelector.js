import React from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

class ListSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      key: '',
      name: '',
    };
  }

  handleChange = (event, index, value) => {
    this.setState({
      key: value,
      name: this.props.people[value]['owner'],
    });

    this.props.selectPerson(this.props.people[value]['list']);
  };

  renderItems = () => {
    let items = [];
    Object.keys(this.props.people).map((key, index) => {
      items.push(<MenuItem key={key} value={key} primaryText={this.props.people[key]['owner']} />);
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
    >
      { this.renderItems() }
    </SelectField>
  }
}

export default ListSelector;