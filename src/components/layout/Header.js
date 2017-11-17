import React from 'react';
import { auth } from '../../helpers/base';
import { withRouter } from 'react-router-dom'; 

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';

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
    this.navigate('person');
  }

  navigateToAll() {
    this.navigate(false);
  }

  navigateToMine() {
    this.navigate('mine');
  }

  navigateChangePassword() {
    this.props.history.push('/change-password');
  }

  signOut() {
    auth.signOut().then(() => {
      console.log(this);
      this.props.history.push('/login');
    });
  }

  navigate(location) {
    if (location === 'mine') {
      this.props.history.push(`/lists/${this.props.user}`);
    } else if (location === 'person') {
      this.props.history.push(`/lists/${this.props.person}`);
    } else {
      this.props.history.push('/lists');
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={`Rooke Secret Santa`}
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><Menu /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem
                onClick={this.navigatePerson}
                primaryText="My Person" 
              />
              <MenuItem 
                onClick={this.navigateMine}
                primaryText="My List"
              />
              <MenuItem 
                onClick={this.navigateAll}
                primaryText="All Lists"
              />
              <Divider />
              <MenuItem 
                onClick={this.navigateChangePassword}
                primaryText="Change Password"
              />
              <MenuItem onClick={this.signOut} primaryText="Sign out" />
            </IconMenu>
          }
        />
      </div>
    )}
}

export default withRouter(Header);