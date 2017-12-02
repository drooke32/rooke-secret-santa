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

    this.state = {
      open: false,
      item: '',
      description: '',
      link: '',
      validation: {
        itemError: '',
        descriptionError: '',
      }
    };
  }

  clickAddButton() {
    this.setState({open: true});
  }

  closeModal() {
    this.setState({
      open: false,
      item: '',
      description: '',
      link: '',
      validation: {
        itemError: '',
        descriptionError: '',
      }
    });
  }

  validateItem() {
    const validation = {...this.state.validation};
    validation['itemError'] = '';
    validation['descriptionError'] = '';
    let valid = true;

    if (!this.state.item) {
      validation['itemError'] = 'The item is required';
      valid = false;
    }

    if (!this.state.description) {
      validation['descriptionError'] = 'You must put in some sort of description or information';
      valid = false;
    }

    this.setState({ validation });
    return valid;
  }

  saveItem() {
    if (!this.validateItem()) {
      return;
    }

    const item = {
      item: this.state.item,
      description: this.state.description,
      link: this.state.link,
    };

    this.props.saveItem(item);
    this.closeModal();
  }

  handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    this.setState({
      [field]: value,
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onClick={ this.closeModal }
      />,
      <RaisedButton
        label="Submit"
        primary={ true }
        onClick={ this.saveItem }
      />,
    ]
    return (
      <div>
        <FloatingActionButton
          secondary={ true }
          className='add-button'
          onClick={ this.clickAddButton }
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          modal={ true }
          title="Add Item"
          actions={ actions }
          open={ this.state.open }
        >
          <TextField
            name="item"
            fullWidth={ true }
            floatingLabelText="Item"
            onChange={ this.handleChange }
            hintText="Enter the item here"
            errorText={ this.state.validation.itemError }
          /><br />
          <TextField
            multiLine={ true }
            fullWidth={ true }
            name="description"
            onChange={ this.handleChange }
            floatingLabelText="Description"
            errorText={ this.state.validation.descriptionError }
            hintText="Describe the item here if you need to. Add things like where it can be purchased, a preferred size, etc."
          /><br />
          <TextField
            name="link"
            fullWidth={ true }
            floatingLabelText="Link"
            onChange={ this.handleChange }
            hintText="If you want to provide a link, add the full url here. It would show up as a usable link on your list item."
          /><br />
        </Dialog>
      </div>
    )
  }
}

export default AddItem;