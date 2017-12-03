import React from 'react';
import { auth } from '../../helpers/base';

import Add from '../partials/Add';
import List from '../partials/List';

const isCurrentUser = (props) => {
  return props.match.params.name === props.user ||
    props.match.path === "/";
}

const isSecretPerson = (props) => {
  return props.match.params.name === props.person;
}

const isOtherPerson = (props) => {
  return props.match.params.name;
}

class Lists extends React.Component {

  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      list: {},
      isOwner: false,
      title: "",
      isAll: false,
    }
  }

  componentDidMount() {
    this.setIsOwner(this.props);
    this.setTitle(this.props);
    this.setList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return;
    }
    this.setIsOwner(nextProps);
    this.setTitle(nextProps);
    this.setList(nextProps);
  }

  setIsOwner(props) {
    if (isCurrentUser(props)) {
      this.setState({isOwner: true});
    } else {
      this.setState({isOwner: false});
    }
  }

  setTitle(props) {
    let title = "All Lists";
    let isAll = false;
    if (isCurrentUser(props)) {
      title = 'My List';
    } else if (isSecretPerson(props)) {
      title = `My Person: ${props.person}`;
    } else if (isOtherPerson(props)) {
      title = props.match.params.name;
    } else {
      title = 'All Lists';
      isAll = true;
    }
    this.setState({title, isAll});
  }

  setList(props) {
    let list = {}

    if (isCurrentUser(props)) {
      list = this.props.people[auth.currentUser.uid]['list'];
    } else if (isOtherPerson(props)) {
      Object.keys(this.props.people).map((key, index) => {
        if (this.props.people[key]['owner'] === props.match.params.name) {
          list = this.props.people[key]['list'];
        }
      });
    } else {
      for (let key in this.props.people) {
        list = this.props.people[key]['list'];
        break;
      }
    }

    this.setState({ 
      list
    });
  }

  addItem(item) {
    this.props.addItem(item);
  }

  editItem(key, item) {
    this.props.editItem(key, item);
  }

  deleteItem(key) {
    this.props.deleteItem(key);
  }

  render() {
    return (
      <div className="container">
        { this.state.isOwner && 
          <Add 
            saveItem={ this.addItem }
          /> 
        }
        <h2 className="list-header">{ this.state.title }</h2>
        <List 
          listItems={ this.state.list }
          isOwner={ this.state.isOwner }
          editItem={ this.editItem }
          deleteItem={ this.deleteItem }
          isAll={ this.state.isAll }
          people={ this.props.people }
        />
      </div>
    );
  }
}

export default Lists;