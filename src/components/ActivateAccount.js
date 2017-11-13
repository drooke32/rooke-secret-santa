import React from 'react';
import { withRouter } from 'react-router-dom'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

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
  <MenuItem key={12} value={'Rose'} primaryText="Rose" />,
]

class ActivateAccount extends React.Component {

  activate(e) {
    e.preventDefault();
    //if account not activated
    //and activation succeeds
    //set in the state and navigate
    this.props.history.push('/');
  }

  changeName = (event, index, value) => {
    this.setState({value});
  };
  render() {
    return (
      <Card className='card'>
        <CardTitle title="Activate Account" />
        <CardText>
          <SelectField onChange={this.changeName} floatingLabelText="Name" fullWidth={true} maxHeight={200}>
            {items}
          </SelectField>
          <TextField floatingLabelText="Email" fullWidth={true} />
          <br />
          <TextField floatingLabelText="Password" type="password" fullWidth={true} />
          <br />
          <TextField floatingLabelText="Confirm Password" type="password" fullWidth={true} />
        </CardText>
        <CardActions className="action-container">
          <RaisedButton 
            label="Activate"
            primary={true}
            className='activate-button'
            onClick={(e) => this.activate(e)}
          />
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(ActivateAccount);