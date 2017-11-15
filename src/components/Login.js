import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import '../css/Login.css';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../base';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {

  login(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.setState({redirectToReferrer: true});
    });
  }

  render() {
    return (
      <Card className='card'>
        <CardTitle title="Rooke Secret Santa" />
        <CardText>
          <TextField floatingLabelText="Email" fullWidth={true} />
          <br />
          <TextField floatingLabelText="Password" type="password" fullWidth={true} />
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