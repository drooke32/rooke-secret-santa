import React from 'react';
import { withRouter } from 'react-router-dom'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import { auth } from '../../helpers/base';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const items = [
  <MenuItem key={1} value={'Aaron'} primaryText="Aaron" />,
  <MenuItem key={2} value={'Ben'} primaryText="Ben" />,
  <MenuItem key={3} value={'Christianne'} primaryText="Christianne" />,
  <MenuItem key={4} value={'Denis'} primaryText="Denis" />,
  <MenuItem key={5} value={'Greg'} primaryText="Greg" />,
  <MenuItem key={6} value={'Ian'} primaryText="Ian" />,
  <MenuItem key={7} value={'Julianne'} primaryText="Julianne" />,
  <MenuItem key={8} value={'Kirk'} primaryText="Kirk" />,
  <MenuItem key={9} value={'Mama'} primaryText="Mama" />,
  <MenuItem key={10} value={'Mel'} primaryText="Mel" />,
  <MenuItem key={11} value={'Papa'} primaryText="Papa" />,
]

class ActivateAccount extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      formValidation: {
        nameError: '',
        nameValid: false,
        emailError: '',
        emailValid: false,
        passwordError: '',
        passwordValid: false,
        confirmError: '',
        confirmValid: false,
        activateError: false,
        activateErrorMessage: '',
      },
    };
  }

  handleChange = (event, index, value) => {
    const field = event.target.name || 'name';
    let targetValue = event.target.value || '';

    if (field === 'name') {
      targetValue = value;
    }

    this.setState({
      [field]: targetValue,
    });

    this.validateField(field, targetValue)
  };

  validateField(field, targetValue) {
    switch(field) {
      case 'email':
        this.validateEmail(targetValue);
        break;
      case 'password':
        this.validatePassword(targetValue);
        break;
      case 'confirm':
        this.validateConfirm(targetValue);
        break;
      default:
        this.validateName(targetValue);
        break;
    }
  }

  validateName(value) {
    const formValidation = {...this.state.formValidation};
    formValidation['nameValid'] = false;
    formValidation['nameError'] = 'You must select a name';

    if (value) {
      formValidation['nameValid'] = true;
      formValidation['nameError'] = '';
    }

    this.setState({ formValidation });
  }

  validateEmail(value) {
    const formValidation = {...this.state.formValidation};
    formValidation['emailValid'] = true;
    formValidation['emailError'] = '';

    if (!value) {
      formValidation['emailValid'] = false;
      formValidation['emailError'] = 'You must enter an email';
    } else if (!this.validEmail(value)) {
      formValidation['emailValid'] = false;
      formValidation['emailError'] = 'The email you entered is not a valid format';
    }

    this.setState({ formValidation });
  }

  validEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  validatePassword(value) {
    const formValidation = {...this.state.formValidation};
    formValidation['passwordValid'] = false;
    formValidation['passwordError'] = 'Password must be at least 6 characters long';

    if (value.length >= 6) {
      formValidation['passwordValid'] = true;
      formValidation['passwordError'] = '';
    }

    this.setState({ formValidation });
  }

  validateConfirm(value) {
    const formValidation = {...this.state.formValidation};
    formValidation['confirmValid'] = false;
    formValidation['confirmError'] = 'The passwords you entered must match ';

    if (this.state.password === value) {
      formValidation['confirmValid'] = true;
      formValidation['confirmError'] = '';
    }

    this.setState({ formValidation });
  }

  validateForm() {
    if (this.state.formValidation.nameValid &&
        this.state.formValidation.emailValid &&
        this.state.formValidation.passwordValid &&
        this.state.formValidation.confirmValid) {
        return true;
    }
    return false;

  }

  setActivateValidation(error, message) {
    const formValidation = {...this.state.formValidation};
    formValidation['activateError'] = error;
    formValidation['activateErrorMessage'] = message;

    this.setState({ formValidation });
  }

  getErrorMessage(code) {
    let message = '';
    switch (code) {
      case 'auth/email-already-in-use':
        message = "The email you supplied is already in use.";
        break;
      case 'auth/invalid-email':
        message = "The email you supplied is invalid.";
        break;
      case 'auth/weak-password':
        message = "The supplied password is weak, try something more complex."
        break;
      default:
        message = "An unknown error occurred";
        break;
    }

    return message;
  }

  handleActivationError(error) {
    const message = this.getErrorMessage(error.code);
    this.setActivateValidation(true, message);
  }

  activate(e) {
    e.preventDefault();

    this.setActivateValidation(false, '');
    if (!this.validateForm()) {
      return;
    }

    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      this.props.activateUser(this.state.name, user.uid);
      //there is an observer on auth change that handles data fetching and redirecting
    }, (error) => {
      this.handleActivationError(error);
    });
  }

  render() {
    return (
      <Card className='container' expanded={this.state.formValidation.activateError}>
        <CardTitle title="Activate Account"/>
        <CardText
          expandable={true}
        >
          <p className="form-error">{this.state.formValidation.activateErrorMessage}</p>
        </CardText>
        <CardText>
          <SelectField 
            ref={(input) => this.name = input}
            value={this.state.name}
            name="name"
            errorText={this.state.formValidation.nameError}
            onChange={this.handleChange}
            floatingLabelText="Name"
            fullWidth={true}
            maxHeight={200}
          >
            {items}
          </SelectField>
          <TextField 
            ref={(input) => this.email = input}
            value={this.state.email}
            name="email"
            errorText={this.state.formValidation.emailError}
            onChange={this.handleChange}
            floatingLabelText="Email"
            fullWidth={true} 
          />
          <br />
          <TextField 
            ref={(input) => this.password = input}
            value={this.state.password}
            name="password"
            errorText={this.state.formValidation.passwordError}
            onChange={this.handleChange}
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
          />
          <br />
          <TextField 
            ref={(input) => this.passsword2 = input}
            value={this.state.confirm}
            name="confirm"
            errorText={this.state.formValidation.confirmError}
            onChange={this.handleChange}
            floatingLabelText="Confirm Password"
            type="password"
            fullWidth={true}
          />
        </CardText>
        <CardActions className="action-container">
          <RaisedButton 
            label="Activate"
            primary={true}
            className='bottom-button'
            onClick={(e) => this.activate(e)}
          />
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(ActivateAccount);