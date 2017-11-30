import React from 'react';
import CryptoJS from 'crypto-js';
import seed from '../../helpers/people'; 
import { base, storageKey } from '../../helpers/base';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardText } from 'material-ui/Card';

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
      match: "Match Incomplete",
      seed: "Database Not Seeded",
    };
  }

  seedDatabase() {
    base.post('people', {
      data: seed
    }).then(() => {
      this.setState({seed: "Database Seeded"});
    });
  }

  matchPeople() {
    let matches = this.ensureValidMatches();
    matches = this.encryptMatches(matches);
    this.saveMatches(matches);
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
    let people = {};
    base.fetch('people', {
      context: this
    }).then((people) => {
      Object.keys(people).map((person, index) => {
        //this array keying is gross, but have to do it like this since
        //we can't assume the key is the persons name, as it changes to a UID
        //once they activate their account
        people[person]['person'] = matches[people[person]['owner']];
      }); 
      base.post('people', {
        data: people
      }).then(() => {
        this.setState({match: "Match Complete"});
      });
    });
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
      <div>
        <Card className='container'>
          <CardText className="login-action-container">
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
        <Card className='container'>
        <CardText className="login-action-container">
          <h1>{this.state.seed}</h1>
        </CardText>
        <CardActions className="action-container">
          <RaisedButton 
            label="Seed People"
            primary={true}
            className='login-button'
            onClick={() => this.seedDatabase()}
          />
        </CardActions>
      </Card>
      </div>
    )
  }
}

export default Match;