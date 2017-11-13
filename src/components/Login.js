import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import '../css/Login.css';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
  render() {
    return (
      <Card className='card'>
        <CardHeader title="Secret Santa Login"/>
        <CardText>
          <TextField floatingLabelText="Email" fullWidth={true} />
          <br />
          <TextField floatingLabelText="Password" type="password" fullWidth={true} />
        </CardText>
        <CardActions className="action-container">
          <RaisedButton label="Login" primary={true} className='login-button' />
          <FlatButton label="Forgot Password" className='forgot-button' />
        </CardActions>
      </Card>
    );
  }
}

export default Login;