import * as React from "react";
import { FirebaseWrapper } from "../firebase/main";
import { LandingPage } from "./LandingPage";
import { MainPage } from "./MainPage";

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
    if (!this.state.authenticated) {
      const logIn = () => this.props.firebase.logIn();
      return <LandingPage logIn={logIn} />;
    }
    return <MainPage firebase={this.props.firebase} />;
  }
}
