import React from 'react';
import { auth } from '../../helpers/base';
import { Link, withRouter } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

const ActionCodeSettings = {
  url: 'https://drooke.com/login'
}

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);

    this.passwordReset = this.passwordReset.bind(this);

    this.state = {
      formValidation: {
        error: false,
        message: '',
        resetSent: false,
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
      default:
        message = "An unknown error occurred";
        break;
    }

    return message;
  }

  handleResetError(error) {
    const message = this.getErrorMessage(error.code);
    this.setFormValidation(true, message);
  }

  passwordReset() {
    this.setFormValidation(false, '');
    
    auth.sendPasswordResetEmail(this.email.input.value, ActionCodeSettings)
    .then(() => {
      this.setState({
        resetSent: true,
      });
    }, (error) => {
      this.handleResetError(error);
    });
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      this.passwordReset();
    }
  }

  renderContent = () => {
    if (this.state.resetSent) {
      return <CardText>
        <p className="list-header">A reset link has been sent to the supplied email.</p>
      </CardText>
    }
    return <CardText>
      <TextField 
        ref={(input) => this.email = input}
        floatingLabelText="Email" 
        fullWidth={true}
      />
    </CardText>;
  }

  renderActions = () => {
    if (this.state.resetSent) {
      return <Link to="/login">
        <RaisedButton 
          label="Back to Login"
          primary={true}
        />
      </Link>
    }
    return <div>
      <RaisedButton 
        label="Retrieve Password"
        primary={true}
        className='bottom-button'
        onClick={this.passwordReset}
      />
      <br />
      <Link to="/login">
        <FlatButton 
          label="Back to Login"
        />
      </Link>
    </div>
  }

  render() {
    return (
      <Card 
        className='container'
        expanded={this.state.formValidation.error}
        onKeyPress={(e) => this.onKeyPress(e)}
      >
        <CardTitle title="Forgot Password" />
        <CardText
          expandable={true}
        >
          <p className="form-error">{this.state.formValidation.message}</p>
        </CardText>
        { this.renderContent() }
        <CardActions className="login-action-container">
          { this.renderActions() }
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(ForgotPassword);