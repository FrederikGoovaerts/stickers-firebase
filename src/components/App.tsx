import * as React from "react";
import { FirebaseWrapper } from "../firebase/main";

interface AppProps {
  firebase: FirebaseWrapper;
}

interface AppState {
  authenticated: boolean;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { authenticated: false };
    // TODO This works because of network latency allowing us to get the callback in place before the call succeeds, fix pls
    this.props.firebase.setAuthCallback((authenticated: boolean) => {
      this.setState({ authenticated });
    });
  }

  render() {
    const logIn = () => this.props.firebase.logIn();
    const logOut = () => this.props.firebase.logOut();
    return (
      <div>
        <h1>{this.state.authenticated ? "authed" : "not authed"}</h1>
        <button onClick={logIn}>Log in</button>
        <button onClick={logOut}>Log out</button>
      </div>
    );
  }
}
