import React, { Component } from 'react';

class Lists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isOwner: false,
      title: "",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props == nextProps) {
      return;
    }

    if (nextProps.match.params.name === nextProps.user ||
      nextProps.match.path === "/") {
      this.setState({isOwner: true});
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

  render() {
    return (
      <div className="container">
        <h2 className="list-header">{this.state.title}</h2>
      </div>
    );
  }
}

export default Lists;