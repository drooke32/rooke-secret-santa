import '../css/App.css';
import CryptoJS from 'crypto-js';
import React, { Component } from 'react';
import { base, auth, encryptionKey} from '../helpers/base';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

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
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      people: {},
      user: '',
      person: '',
    };
  }
  
  componentWillMount() {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        base.fetch('people', {
          context: this
        }).then(people => {
          const user = people[authUser.uid];
          if (user) { //it won't find the user during active, so this check is necessary
            this.setStateAndRedirectToMyList(user, people);
          }
        });
      }
    });
  }

  activateUser(name, uid) {
    base.fetch(`people`, {
      context: this
    }).then((people) => {
      people[uid] = people[name];
      const user = people[uid];
      people[name] = null;
      base.update('people', {
        data: people
      });

      //because the user key doesnt match in activate, handle the state and redirect here
      this.setStateAndRedirectToMyList(user, people);
    });
  }

  setStateAndRedirectToMyList(user, people) {
    const data = {
      people,
      user: user['owner'],
      person : CryptoJS.AES.decrypt(user['person'], encryptionKey).toString(CryptoJS.enc.Utf8)
    };
    this.setState(data);
    this.props.history.push('/');
  }

  addItem(item) {
    const people = {...this.state.people};
    const person = people[auth.currentUser.uid];
    const timestamp = Date.now();

    if (!person['list'] || person['list'] === -1) {
      person['list'] = [];
    }

    person['list'][`item-${timestamp}`] = item;
    people[auth.currentUser.uid] = person;

    base.post(`people/${auth.currentUser.uid}`, {
      data: person
    }).then(() => {
      this.setState({ people });
    });
  }

  editItem(key, item) {
    const people = {...this.state.people};
    const person = people[auth.currentUser.uid];

    person['list'][key] = item;
    people[auth.currentUser.uid] = person;

    base.post(`people/${auth.currentUser.uid}`, {
      data: person
    }).then(() => {
      this.setState({ people });
    });
  }

  deleteItem(key) {
    const people = {...this.state.people};
    const person = people[auth.currentUser.uid];

    
    delete person['list'][key];
    const noItemsInList = Object.keys(person['list']).length === 0;

    if (noItemsInList) {
      person['list'] = -1; //have to put in a value or firebase removes the key
    }
    people[auth.currentUser.uid] = person;

    if (noItemsInList) {
      base.post(`people/${auth.currentUser.uid}/list`, {
        data: -1
      }).then(() => {
        this.setState({ people });
      });
    } else {
      base.remove(`people/${auth.currentUser.uid}/list/${key}`).then(() => {
        this.setState({ people });
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header 
            user={ this.state.user }
            person={ this.state.person }
          />
          <Switch>
            <PropsRoute 
              path="/login"
              component={ Login }
            />
            <PrivateRoute
              exact
              path="/"
              component={ Lists }
              redirectTo="/login"
              user={ this.state.user }
              addItem={ this.addItem }
              editItem={ this.editItem }
              person={ this.state.person }
              people={ this.state.people }
              deleteItem={ this.deleteItem }
            />
            <PrivateRoute
              component={ Lists }
              redirectTo="/login"
              path="/lists/:name?"
              user={ this.state.user }
              addItem={ this.addItem }
              editItem={ this.editItem }
              person={ this.state.person }
              people={ this.state.people }
              deleteItem={ this.deleteItem }
            />
            <PropsRoute 
              path="/forgot-password"
              component={ ForgotPassword }
            />
            <PrivateRoute 
              redirectTo="/login"
              path="/change-password"
              component={ ChangePassword }
            />
            <PropsRoute
              path="/activate"
              component={ ActivateAccount }
              activateUser={ this.activateUser }
            />
            {
              //Keep this commented out unless you need to match people again
            //<PropsRoute path="/match" component={Match} people={this.state.people} saveMatches={this.saveMatches}/>
            }
            <Route component={ NotFound }/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
