import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom'
import '../css/App.css';
import base from '../base';
import samplePeople from '../people';

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

    this.loadPeople = this.loadPeople.bind(this);

    this.state = {
      people: {},
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

  loadPeople() {
    console.log('loaded People');
    console.log(this);
    console.log(samplePeople);
    this.setState({
      people: samplePeople
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Switch>
            <PropsRoute path="/login" component={Login} loadPeople={this.loadPeople}/>
            <PrivateRoute exact path="/" component={Lists}/>
            <PrivateRoute path="/lists" component={Lists}/>
            <PropsRoute path="/forgot-password" component={ForgotPassword}/>
            <PropsRoute path="/change-password" component={ChangePassword}/>
            <PropsRoute path="/activate" component={ActivateAccount}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
