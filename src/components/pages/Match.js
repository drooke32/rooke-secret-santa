import React from 'react';
import CryptoJS from 'crypto-js';
import { storageKey } from '../../helpers/base';
import { Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

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
    this.matchPeople();
    console.log(this.matches);
  }

  matchPeople() {
    let result = [];
    let notMatched = true;

    while (notMatched) {
      let matched = this.shuffle(people.slice());
      notMatched = false;
      for (let i = 0, len = people.length; i < len; i++) {
        if (this.matchFailed(people[i], matched[i])) {
          console.log('failed');
          notMatched = true;
        }
        result[people[i]] = matched[i];
      }
      if (notMatched) {
        result = [];
      }
    }

    this.encryptMatches(result);
  }

  shuffle(people) {
      for (let i = people.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [people[i], people[j]] = [people[j], people[i]];
      }
      return people;
  }

  encryptMatches(matches) {
    for (let i = 0, len = matches.length; i < len; i++) {
      matches[i] = CryptoJS.AES.encrypt(matches[i], storageKey);
    }
console.log(matches);
    this.matches = matches;
  }

  matchFailed(person, match) {
    if (person === match) {
      return true;
    }

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
        <Table>
          <TableBody>
          {this.matches.map( (item, index) => (
              <TableRow>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{item}</TableRowColumn>
              </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Match;