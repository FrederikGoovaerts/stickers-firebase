// React
import * as React from "react";
import * as ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// Firebase
import "./firebase/main";

// Application
import { App } from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
