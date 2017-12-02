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
      isOwner: this.props.isOwner,
      item: this.props.item,
      description: this.props.description,
      link: this.props.link,
      itemKey: this.props.itemKey
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

  editItem() {
    console.log('edit click');
  }

  deleteItem() {
    this.props.deleteItem(this.state.itemKey);
  }

  render() {
    return (
      <Card className='container'>
        <CardTitle title={ this.state.item } />
        <CardText>
          <p>{ this.state.description }</p>
          <br />
          { this.state.link && 
            <a href={ this.state.link }>Link to Item</a>
          }
        </CardText>
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