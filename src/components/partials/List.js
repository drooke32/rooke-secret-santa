import React from 'react';

import Item from './Item';
import ListSelector from './ListSelector';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.selectPerson = this.selectPerson.bind(this);

    this.state = {
      isOwner: this.props.isOwner,
      isAll: this.props.isAll,
      listItems: -1,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      this.setState({
        listItems: nextProps.listItems,
        isAll: nextProps.isAll,
        isOwner: nextProps.isOwner,
      });
    }
  }

  selectPerson(listItems) {
    this.setState({listItems});
  }

  editItem(key, item) {
    this.props.editItem(key, item);
  }

  deleteItem(key) {
    this.props.deleteItem(key);
  }

  RenderList = () => {
    if (!this.state.listItems || this.state.listItems === -1) {
      return (<h2 className="no-list">No Items on List</h2>);
    }
    const items = [];
    Object.keys(this.state.listItems).map((key) => {
      items.push(<Item
        isOwner={ this.state.isOwner }
        item={ this.state.listItems[key].item }
        description={ this.state.listItems[key].description }
        link={ this.state.listItems[key].link }
        key={ key }
        itemKey={ key }
        deleteItem={ this.deleteItem }
        saveItem={ this.editItem }
        isEditing= { false }
      />);
    });
    return items;
  }

  render() {
    return (
      <div className='list-container'>
        { this.state.isAll && 
          <ListSelector
            people={ this.props.people }
            selectPerson={ this.selectPerson }
          />
        }
        { this.RenderList() }
      </div>
    );
  }
}

export default List;