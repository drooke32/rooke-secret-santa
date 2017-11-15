import React from 'react';
import { withRouter } from 'react-router-dom'
import { auth } from '../../helpers/base';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  navigate = (e) => {
    console.log(e.target.value);
    console.log(e);
    this.props.history.push(e.target.value);
  }

  signOut(e) {
    e.preventDefault();
    auth.signOut().then(() => {
      this.props.history.push('/login');
    }, () => {
      //error occured
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
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
                value="/lists/denis"
                onClick={this.navigate}
                primaryText="My Person" 
              />
              <MenuItem 
                value="/lists/aaron"
                onClick={this.navigate}
                primaryText="My List"
              />
              <MenuItem 
                value="/lists"
                onClick={this.navigate}
                primaryText="All Lists"
              />
              <Divider />
              <MenuItem 
                value="/change-password"
                onClick={this.navigate}
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