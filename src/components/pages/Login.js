import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import '../../css/Login.css';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../helpers/base';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  login(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.props.history.push('/');
    }, (error) => {
      //login failed, check error and inform the user
    });
  }

  render() {
    return (
      <Card className='card'>
        <CardTitle title="Rooke Secret Santa" />
        <CardText>
          <TextField 
            floatingLabelText="Email" 
            fullWidth={true}
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br />
          <TextField 
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
            onChange={this.handleChange}
            value={this.state.email}
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