import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom'
import '../css/App.css';

import Lists from './Lists';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import ActivateAccount from './ActivateAccount';
import NotFound from './NotFound';

const auth = {
  isAuthenticated: false
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated 
    ? ( <Component {...props}/> ) 
    : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Switch>
            <Route path="/login" component={Login}/>
            <PrivateRoute exact path="/" component={Lists}/>
            <PrivateRoute path="/lists" component={Lists}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/change-password" component={ChangePassword}/>
            <Route path="/activate" component={ActivateAccount}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
