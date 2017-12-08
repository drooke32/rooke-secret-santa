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

class ChangePassword extends React.Component {

  constructor(props) {
    super(props);

    this.passwordChange = this.passwordChange.bind(this);

    this.state = {
      formValidation: {
        error: false,
        message: '',
        passwordChanged: false,
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
      case 'auth/weak-password':
      message = "The supplied password is weak, try something more complex."
      break;
      case 'auth/requires-recent-login':
        message = "You must log in to update your password using this method."
        break;
      default:
        message = "An unknown error occurred";
        break;
    }

    return message;
  }

  handleChangeError(error) {
    const message = this.getErrorMessage(error.code);
    this.setFormValidation(true, message);
  }

  passwordChange() {
    this.setFormValidation(false, '');
    
    auth.currentUser.updatePassword(this.password.input.value)
    .then(() => {
      this.setState({
        passwordChanged: true,
      });
    }, (error) => {
      this.handleResetError(error);
    });
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      this.passwordChange();
    }
  }

  renderContent = () => {
    if (this.state.passwordChanged) {
      return <CardText>
        <p className="list-header">Your password has successfully updated.</p>
      </CardText>
    }
    return <CardText>
      <TextField 
        ref={(input) => this.password = input}
        floatingLabelText="New Password" 
        fullWidth={true}
        type="password"
      />
    </CardText>;
  }

  renderActions = () => {
    if (this.state.passwordChanged) {
      return <Link to="/">
        <RaisedButton 
          label="Back to My List"
          primary={true}
        />
      </Link>
    }
    return <div>
      <RaisedButton 
        label="Change Password"
        primary={true}
        className='bottom-button'
        onClick={this.passwordChange}
      />
      <br />
      <Link to="/">
        <FlatButton 
          label="Back to My List"
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
        <CardTitle title="Change Password" />
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

export default withRouter(ChangePassword);