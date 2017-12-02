import React from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

class Item extends React.Component {

  constructor(props) {
    super(props);

    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.cancel = this.cancel.bind(this);
    this.saveItem = this.saveItem.bind(this);
    
    this.state = {
      isOwner: this.props.isOwner,
      item: this.props.item,
      description: this.props.description,
      link: this.props.link,
      itemKey: this.props.itemKey,
      isEditing: false,
      editState: {},
      validation: {
        itemError: '',
        descriptionError: '',
      }
    };
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      this.setState({
        isOwner: nextProps.isOwner,
        item: nextProps.item,
        description: nextProps.description,
        link: nextProps.link,
        itemKey: nextProps.itemKey,
      })
    }
  }

  handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    this.setState({
      [field]: value,
    });
  };

  saveItem() {
    if (!this.validateItem()) {
      return;
    }

    const item = {
      item: this.state.item,
      description: this.state.description,
      link: this.state.link,
    };

    this.props.saveItem(this.state.itemKey, item);
    this.setState({ isEditing: false });
  }

  editItem() {
    this.setState({ 
      editState: this.state,
      isEditing: true,
    });
  }

  cancel() {
    this.setState(this.state.editState);
  }

  deleteItem() {
    this.props.deleteItem(this.state.itemKey);
  }

  renderContent = () => {
    if (this.state.isEditing) {
      return <CardText>
        <TextField
          name="item"
          fullWidth={ true }
          floatingLabelText="Item"
          value={ this.state.item }
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
          value={ this.state.description }
          errorText={ this.state.validation.descriptionError }
          hintText="Describe the item here if you need to. Add things like where it can be purchased, a preferred size, etc."
        /><br />
        <TextField
          name="link"
          fullWidth={ true }
          floatingLabelText="Link"
          value={ this.state.link }
          onChange={ this.handleChange }
          hintText="If you want to provide a link, add the full url here. It would show up as a usable link on your list item."
        /><br />
      </CardText>;
    }

    return <div>
      <CardTitle title={ this.state.item } />
      <CardText>
        <p>{ this.state.description }</p>
        <br />
        { this.state.link && 
          <a href={ this.state.link }>Link to Item</a>
        }
      </CardText>
    </div>;
  }

  renderActions = () => {
    if (this.state.isEditing) {
      return <CardActions className="action-container">
        <FlatButton
          label="Cancel"
          primary={ true }
          onClick={ this.cancel }
        />
        <RaisedButton
          label="Submit"
          primary={ true }
          onClick={ this.saveItem }
        />
      </CardActions>
    }
    if (this.state.isOwner) {
      return <CardActions className="action-container">
        <FlatButton
          label="Delete"
          primary={ true }
          onClick={ this.deleteItem }
        />
        <RaisedButton
          label="Edit"
          primary={ true }
          onClick={ this.editItem }
        />
      </CardActions>
    }
  }

  render() {
    return (
      <Card className='container'>
        { this.renderContent() }
        
        { this.renderActions() }
      </Card>
    );
  }
}

export default Item;