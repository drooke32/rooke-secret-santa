import React from 'react';
import CryptoJS from 'crypto-js';
import { storageKey } from '../../helpers/base';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

const people = [
  'Aaron',
  'Ben',
  'Christianne',
  'Denis',
  'Greg',
  'Ian',
  'Julianne',
  'Kirk',
  'Mama',
  'Mel',
  'Papa',
];


class Match extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      match: "Match Incomplete"
    };
  }

  matchPeople() {
    let matches = this.ensureValidMatches();
    matches = this.encryptMatches(matches);
    this.saveMatches(matches);
    this.setState({
      match: 'Match Complete'
    });
  }

  ensureValidMatches() {
    let result = [];
    let notMatched = true;

    while (notMatched) {
      let matched = this.shuffle(people.slice());
      notMatched = false;
      for (let i = 0, len = people.length; i < len; i++) {
        if (this.matchFailed(people[i], matched[i])) {
          notMatched = true;
        }
        result[people[i]] = matched[i];
      }
      if (notMatched) {
        result = [];
      }
    }

    return result;
  }

  shuffle(people) {
      for (let i = people.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [people[i], people[j]] = [people[j], people[i]];
      }
      return people;
  }

  saveMatches(matches) {
    let people = this.props.people;
    Object.keys(people).map((person, index) => {
      //this array keying is gross, but not sure how to avoid it
      people[person]['person'] = matches[people[person]['owner']];
    }); 
    this.props.saveMatches(this.props.people);
  }

  encryptMatches(matches) {
    people.forEach((person) => {
      matches[person] = CryptoJS.AES.encrypt(matches[person], storageKey).toString();
    });
    return matches;
  }

  matchFailed(person, match) {
    //obviously don't match people to themselves
    if (person === match) {
      return true;
    }

    //requested that couples don't match with their partners
    if (person === 'Ben' && match === 'Christianne'
    || person === 'Christianne' && match === 'Ben') {
      return true;
    }

    if (person === 'Julianne' && match === 'Kirk'
    || person === 'Kirk' && match === 'Julianne') {
      return true;
    }

    if (person === 'Denis' && match === 'Mel'
    || person === 'Mel' && match === 'Denis') {
      return true;
    }

    if (person === 'Mama' && match === 'Papa'
    || person === 'Papa' && match === 'Mama') {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Card className='card'>
        <CardText className="action-container">
          <h1>{this.state.match}</h1>
        </CardText>
        <CardActions className="action-container">
          <RaisedButton 
            label="Match People"
            primary={true}
            className='login-button'
            onClick={() => this.matchPeople()}
          />
        </CardActions>
      </Card>
    )
  }
}

export default Match;