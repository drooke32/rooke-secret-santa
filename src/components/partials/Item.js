import React from 'react';

//import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

class Item extends React.Component {

  constructor(props) {
    super(props);

    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      isOwner: false,
      item: '',
      description: '',
      link: '',
      itemKey: '',
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      this.setState({
        isOwner: nextProps.isOwner,
        item: nextProps.item,
        description: nextProps.description,
        link: nextProps.link,
        itemKey: nextProps.itemKey
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

  editItem() {
    this.setState({ isEditing: true });
  }

  deleteItem() {
    this.props.deleteItem(this.state.itemKey);
  }

  render() {
    return (
      <Card className='container'>
        <CardTitle title={ this.state.item } />
        { this.state.isEditing ? 
          <CardText>
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
          </CardText>
        :
          <CardText>
            <p>{ this.state.description }</p>
            <br />
            { this.state.link && 
              <a href={ this.state.link }>Link to Item</a>
            }
          </CardText>
        }
        
        { this.state.isOwner &&
          <CardActions className="action-container">
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
      </Card>
    );
  }
}

export default Item;