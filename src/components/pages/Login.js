import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import '../../css/Login.css';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../helpers/base';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
  login(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(this.email.input.value, this.password.input.value)
    .then(() => {
      //HANDLE GRABBING THE LOGGED IN PERSON
      this.props.history.push('/');
    }, (error) => {
      //HANDLE ERROR ON LOGIN
      //login failed, check error and inform the user
    });
  }

  render() {
    return (
      <Card className='card'>
        <CardTitle title="Rooke Secret Santa" />
        <CardText>
          <TextField 
            ref={(input) => this.email = input}
            floatingLabelText="Email" 
            fullWidth={true}
          />
          <br />
          <TextField 
            ref={(input) => this.password = input}
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
          />
        </CardText>
        <CardActions className="action-container">
          <RaisedButton 
            label="Login"
            primary={true}
            className='login-button'
            onClick={(e) => this.login(e)}
          />
          <br />
          <Link to="/activate">
            <FlatButton 
              label="Activate Account"
              className='activate-button'
            />
          </Link>
          <br />
          <Link to="/forgot-password">
            <FlatButton 
              label="Forgot Password"
              className='forgot-button'
            />
          </Link>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(Login);