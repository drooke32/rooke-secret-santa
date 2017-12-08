import React from 'react';
import { auth } from '../../helpers/base';
import { Link, withRouter } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formValidation: {
        error: false,
        message: '',
      }
    };
  }

  setFormValidation(error, message) {
    const formValidation = {...this.state.formValidation};
    formValidation['error'] = error;
    formValidation['message'] = message;

    this.setState({ formValidation });
  }

  getErrorMessage(code) {
    let message = '';
    switch (code) {
      case 'auth/invalid-email':
        message = "The email you supplied is invalid.";
        break;
      case 'auth/user-not-found':
        message = "The supplied email is not associated with a user."
        break;
      case 'auth/wrong-password':
        message = "The password you entered is incorrect";
        break;
      default:
        message = "An unknown error occurred";
        break;
    }

    return message;
  }

  handleLoginError(error) {
    const message = this.getErrorMessage(error.code);
    this.setFormValidation(true, message);
  }

  login(e) {
    e.preventDefault();
    this.setFormValidation(false, '');

    auth.signInWithEmailAndPassword(this.email.input.value, this.password.input.value)
    .then(() => {
      //there is an observer on auth change that handles data fetching and redirecting
    }, (error) => {
      this.handleLoginError(error);
    });
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      this.login(e);
    }
  }

  render() {
    return (
      <Card 
        className='container'
        expanded={this.state.formValidation.error}
        onKeyPress={(e) => this.onKeyPress(e)}
      >
        <CardTitle title="Rooke Secret Santa" />
        <CardText
          expandable={true}
        >
          <p className="form-error">{this.state.formValidation.message}</p>
        </CardText>
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
        <CardActions className="login-action-container">
          <RaisedButton 
            label="Login"
            primary={true}
            className='bottom-button'
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