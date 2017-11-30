import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "YOUR-FIREBASE-API-KEY",
  authDomain: "YOUR-FIREBASE-AUTH-DOMAIN",
  databaseURL: "YOUR-FIREBASE-DATABASE-URL",
});

export const base = Rebase.createClass(app.database());

export const auth = app.auth();
export const encryptionKey = 'YOUR-ENCRYPTION-KEY';
