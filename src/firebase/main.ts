import * as firebase from "firebase/app";
import "firebase/auth";
import { auth } from "firebaseui";

import "firebase/firestore";

import { FIREBASE_CONFIG } from "../configuration/firebase";

firebase.initializeApp(FIREBASE_CONFIG);
const ui = new auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
});
