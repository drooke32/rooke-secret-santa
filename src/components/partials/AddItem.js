import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const floatingButtonStyle = {
  position: 'absolute',
  bottom: '40px',
  right: '40px',
}

class AddItem extends React.Component {

  constructor(props) {
    super(props);

    this.clickAddButton = this.clickAddButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addItem = this.addItem.bind(this);

    this.state = {open: false};
  }

  clickAddButton() {
    this.setState({open: true});
  }

  closeModal() {
    this.setState({open: false});
  }

  addItem() {
    //validate
    this.props.addItem('test');
    this.closeModal();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.addItem}
      />,
    ]
    return (
      <div>
        <FloatingActionButton 
          secondary={true} 
          style={floatingButtonStyle}
          onClick={ this.clickAddButton }
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add Item"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          FormFields go here
        </Dialog>
      </div>
    )
  }
}

export default AddItem;