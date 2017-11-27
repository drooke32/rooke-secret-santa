import '../css/App.css';
import CryptoJS from 'crypto-js';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { base, auth, storageKey, isAuthenticated} from '../helpers/base';

import Lists from './pages/Lists';
import Login from './pages/Login';
//import Match from './pages/Match';
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
    this.addItem = this.addItem.bind(this);

    this.state = {
      people: {},
      user: '',
      person: '',
    };
  }

  componentWillMount() {
    this.ref = base.syncState('people', {
      context: this,
      state: 'people'
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        window.localStorage.setItem(storageKey, authUser.uid);
        const user = this.state.people[authUser.uid];
        if (user) {
          this.setCurrentUserInState(user);
        }
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({user: null, person: null});
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (Object.keys(this.state.people).length === 0 && nextState.people) {
      const user = nextState.people[auth.currentUser.uid];
      if (user) {
        this.setCurrentUserInState(user);
      }
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  setCurrentUserInState(user) {
    const person = CryptoJS.AES.decrypt(user['person'], storageKey).toString(CryptoJS.enc.Utf8);
    this.setState({user: user['owner'], person});
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

  addItem(item) {
    console.log(item);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header 
            user={this.state.user}
            person={this.state.person}
            auth={auth}
            isAuthenticated={isAuthenticated}
          />
          <Switch>
            <PropsRoute path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/"
              redirectTo="/login"
              user={this.state.user}
              person={this.state.person}
              people={this.state.people}
              component={Lists}
              addItem={this.addItem}
            />
            <PrivateRoute
              path="/lists/:name?"
              redirectTo="/login"
              user={this.state.user}
              person={this.state.person}
              people={this.state.people}
              component={Lists}
              addItem={this.addItem}
            />
            <PropsRoute path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute 
              path="/change-password"
              redirectTo="/login"
              component={ChangePassword}
            />
            <PropsRoute
              path="/activate"
              component={ActivateAccount}
              activateUser={this.activateUser}
            />
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
