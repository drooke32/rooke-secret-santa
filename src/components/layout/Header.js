import React from 'react';
import { withRouter } from 'react-router-dom'; 

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.navigateToPerson = this.navigateToPerson.bind(this);
    this.navigateToAll = this.navigateToAll.bind(this);
    this.navigateToMine = this.navigateToMine.bind(this);
    this.navigateChangePassword = this.navigateChangePassword.bind(this);
    this.signOut = this.signOut.bind(this);

    this.state = {open: false};
  }

  navigateToPerson() {
    this.props.history.push(`/lists/${this.props.person}`);
  }

  navigateToAll() {
    this.props.history.push('/lists');
  }

  navigateToMine() {
    this.props.history.push(`/lists/${this.props.user}`);
  }

  navigateChangePassword() {
    this.props.history.push('/change-password');
  }

  signOut() {
    this.props.auth.signOut().then(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title={`Rooke Secret Santa`}
          showMenuIconButton={false}
          iconElementRight={
            this.props.isAuthenticated() ?
            <IconMenu
              iconButtonElement={
                <IconButton><Menu /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem
                onClick={this.navigateToPerson}
                primaryText="My Person" 
              />
              <MenuItem 
                onClick={this.navigateToMine}
                primaryText="My List"
              />
              <MenuItem 
                onClick={this.navigateToAll}
                primaryText="All Lists"
              />
              <Divider />
              <MenuItem 
                onClick={this.navigateChangePassword}
                primaryText="Change Password"
              />
              <MenuItem onClick={this.signOut} primaryText="Sign out" />
            </IconMenu>
            : <FlatButton label="Login" />
          }
        />
      </div>
    )}
}

export default withRouter(Header);