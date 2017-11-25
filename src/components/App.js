import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom'
import '../css/App.css';
import { base, auth, storageKey, isAuthenticated } from '../helpers/base';

import Lists from './pages/Lists';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import ActivateAccount from './pages/ActivateAccount';
import NotFound from './pages/NotFound';
import Match from './pages/Match';
import Header from './layout/Header';

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

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);

        //use the user.uid to get the proper person out of state
        //be sure to decrypt their person
        this.setState({user: user.uid});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({user: null});
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  saveMatches(people) {
    this.setState({people});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header user={this.state.user} auth={auth} isAuthenticated={isAuthenticated}/>
          <Switch>
            <PropsRoute path="/login" component={Login} />
            <PrivateRoute exact path="/" redirectTo="/login" component={Lists}/>
            <PrivateRoute path="/lists" redirectTo="/login" component={Lists}/>
            <PropsRoute path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute path="/change-password" redirectTo="/login" component={ChangePassword}/>
            <PropsRoute path="/activate" component={ActivateAccount} />
            <PropsRoute path="/match" component={Match} people={this.state.people} saveMatches={this.saveMatches}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
