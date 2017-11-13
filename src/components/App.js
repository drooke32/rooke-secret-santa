import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom'
import '../css/App.css';

import Lists from './Lists';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import ActivateAccount from './ActivateAccount';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Switch>
            <Route exact path="/" component={Lists}/>
            <Route path="/lists" component={Lists}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/change-password" component={ChangePassword}/>
            <Route path="/active" component={ActivateAccount}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
