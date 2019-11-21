// React
import * as React from "react";
import * as ReactDOM from "react-dom";

// Firebase
import { FirebaseWrapper } from "./firebase/main";
import { FIREBASE_CONFIG } from "./configuration/firebase";

const stickersFirebase = new FirebaseWrapper(FIREBASE_CONFIG);

// Application
import { App } from "./components/App";
import "./index.scss";

ReactDOM.render(
  <App firebase={stickersFirebase} />,
  document.getElementById("root")
);
