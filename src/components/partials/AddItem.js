import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={this.addItem}
      />,
    ]
    return (
      <div>
        <FloatingActionButton
          className='add-button'
          secondary={true}
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
          <TextField
            floatingLabelText="Item"
            fullWidth={true}
          /><br />
          <TextField
            multiLine={true}
            floatingLabelText="Description"
            fullWidth={true}
          /><br />
          <TextField
            floatingLabelText="Link"
            fullWidth={true}
          /><br />
        </Dialog>
      </div>
    )
  }
}

export default AddItem;