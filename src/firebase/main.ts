// Load main components
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

import { FIREBASE_CONFIG } from "../configuration/firebase";

firebase.initializeApp(FIREBASE_CONFIG);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
});
