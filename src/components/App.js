import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom'
import '../css/App.css';
import { base, auth } from '../base';

import Lists from './Lists';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import ActivateAccount from './ActivateAccount';
import NotFound from './NotFound';

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  console.log(auth);
  console.log(auth.currentUser);
  return (
    <Route {...rest} render={routeProps => {
      return auth.currentUser
      ? ( renderMergedProps(component, routeProps, rest) ) 
      : (
        <Redirect to={{
          pathname: redirectTo,
          state: { from: routeProps.location }
        }}/>
      );
    }}/>
  );
}

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component {

  constructor() {
    super();

    this.state = {
      people: {},
      user: {},
      person: {},
    };
  }

  componentWillMount() {
    //this runs right before teh app is rendered
    this.ref = base.syncState('people', {
      context: this,
      state: 'people'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  login(user) {
    //set in the state and navigate
    this.props.history.push('/');
  }

  activate(user) {
    //set in the state and navigate
    auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    this.history.push('/');
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Switch>
            <PropsRoute path="/login" component={Login} loginUser={this.login} />
            <PrivateRoute exact path="/" redirectTo="/login" component={Lists}/>
            <PrivateRoute path="/lists" redirectTo="/login" component={Lists}/>
            <PropsRoute path="/forgot-password" component={ForgotPassword}/>
            <PropsRoute path="/change-password" component={ChangePassword}/>
            <PropsRoute path="/activate" component={ActivateAccount} activateUser={this.activate} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
