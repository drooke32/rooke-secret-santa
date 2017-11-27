import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDxHa_keJNVt76i6kInWF2uVsR1jjpzqds",
  authDomain: "rooke-secret-santa.firebaseapp.com",
  databaseURL: "https://rooke-secret-santa.firebaseio.com",
});

export const base = Rebase.createClass(app.database());

export const auth = app.auth();
export const storageKey = 'rooke-secret-santa-auth';
export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}