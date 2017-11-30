import '../css/App.css';
import CryptoJS from 'crypto-js';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { base, auth, storageKey} from '../helpers/base';

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

    this.activateUser = this.activateUser.bind(this);
    this.addItem = this.addItem.bind(this);

    this.state = {
      people: {},
      user: '',
      person: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        base.fetch('people', {
          context: this
        }).then(people => {
          const user = people[auth.currentUser.uid];
          const data = {
            people,
            user: user['owner'],
            'person' : CryptoJS.AES.decrypt(user['person'], storageKey).toString(CryptoJS.enc.Utf8)
          };
          this.setState(data);
        });
      }
    });
  }

  activateUser(name, uid) {
    base.fetch(`people`, {
      context: this
    }).then((people) => {
      people[uid] = people[name];
      people[name] = null;
      base.update('people', {
        data: people
      });
    });
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
            */}
            <PropsRoute path="/match" component={Match} people={this.state.people} saveMatches={this.saveMatches}/> 
            <Route component={NotFound}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
