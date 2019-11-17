// Load main components
import * as firebase from "firebase";

import { FIREBASE_CONFIG } from "../configuration/firebase";

firebase.initializeApp(FIREBASE_CONFIG);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(firebase.auth().currentUser?.displayName);
  } else {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        // @ts-ignore
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode);
      });
  }
});
