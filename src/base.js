import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDxHa_keJNVt76i6kInWF2uVsR1jjpzqds",
  authDomain: "rooke-secret-santa.firebaseapp.com",
  databaseURL: "https://rooke-secret-santa.firebaseio.com",
});

const base = Rebase.createClass(app.database());

const auth = app.auth();
export { base, auth };