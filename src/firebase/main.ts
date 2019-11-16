import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { FIREBASE_CONFIG } from "../configuration/firebase";

firebase.initializeApp(FIREBASE_CONFIG);
