import '../css/App.css';
import CryptoJS from 'crypto-js';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { base, auth, storageKey, isAuthenticated } from '../helpers/base';

import Lists from './pages/Lists';
import Login from './pages/Login';
import Match from './pages/Match';
import Header from './layout/Header';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import ActivateAccount from './pages/ActivateAccount';

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return isAuthenticated
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

    this.saveMatches = this.saveMatches.bind(this);
    this.activateUser = this.activateUser.bind(this);

    this.state = {
      people: {},
      user: {},
      person: {},
    };
  }

  componentWillMount() {
    this.ref = base.syncState('people', {
      context: this,
      state: 'people'
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setCurrentUserInState(user.uid);
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({user: null, person: null});
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  setCurrentUserInState(uid) {
    const user = this.state.people[uid];
    if (user) {
      const person = CryptoJS.AES.decrypt(user['person'], storageKey).toString(CryptoJS.enc.Utf8);
      this.setState({user: user['owner'], person});
    }
  }

  saveMatches(people) {
    this.setState({people});
  }

  activateUser(name, uid) {
    const people = {...this.state.people};
    people[uid] = people[name];
    people[name] = null;
    this.setState({ people });
    this.setCurrentUserInState(uid);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header user={this.state.user} person={this.state.person} auth={auth} isAuthenticated={isAuthenticated}/>
          <Switch>
            <PropsRoute path="/login" component={Login} />
            <PrivateRoute exact path="/" redirectTo="/login" user={this.state.user} person={this.state.person} component={Lists}/>
            <PrivateRoute path="/lists" redirectTo="/login" user={this.state.user} person={this.state.person} component={Lists}/>
            <PropsRoute path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute path="/change-password" redirectTo="/login" component={ChangePassword}/>
            <PropsRoute path="/activate" component={ActivateAccount} activateUser={this.activateUser} />
            {/* 
              Keep this commented out unless you need to match people again
              <PropsRoute path="/match" component={Match} people={this.state.people} saveMatches={this.saveMatches}/> 
            */}
            <Route component={NotFound}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
