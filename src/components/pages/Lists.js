import React from 'react';

import AddItem from '../partials/AddItem';

class Lists extends React.Component {

  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);

    this.state = {
      list: [],
      isOwner: false,
      title: "",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return;
    }

    if (nextProps.match.params.name === nextProps.user ||
      nextProps.match.path === "/") {
      this.setState({isOwner: true});
    } else {
      this.setState({isOwner: false});
    }
    this.setTitle(nextProps);
  }

  setTitle(props) {
    let title = "All Lists";
    if (props.match.params.name === props.user ||
      props.match.path === "/") {
      title = 'My List';
    } else if (props.match.params.name === props.person) {
      title = `My Person: ${props.person}`;
    } else if (props.match.params.name) {
      title = props.match.params.name;
    } else {
      title = 'All Lists';
    }
    this.setState({title});
  }

  addItem(item) {
    this.props.addItem(item);
  } 

  render() {
    return (
      <div className="container">
        { this.state.isOwner && 
          <AddItem 
            addItem={ this.addItem }
          /> 
        }
        <h2 className="list-header">{this.state.title}</h2>
      </div>
    );
  }
}

export default Lists;