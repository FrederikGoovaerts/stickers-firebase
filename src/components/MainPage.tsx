import * as React from "react";
import { isInteger, toNumber } from "lodash";

import { FirebaseWrapper } from "../firebase/main";

interface MainPageProps {
  firebase: FirebaseWrapper;
}

interface MainPageState {
  logInput: string;
  logError: string | undefined;
  lastLogs: string[];
  spendInput: string;
  spendError: string | undefined;
  lastSpendings: string[];
  availableCredits: number;
}

export class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      spendInput: "",
      spendError: undefined,
      lastSpendings: [],
      logInput: "",
      logError: undefined,
      lastLogs: [],
      availableCredits: 0
    };
    this.updateCredits();
    this.updateLatestLogs();
    this.updateLatestSpendings();
  }

  updateCredits() {
    this.props.firebase
      .getAvailableCredits()
      .then(val => this.setState({ availableCredits: val }));
  }

  updateLatestLogs() {
    this.props.firebase
      .getLastLogs(5)
      .then(val => this.setState({ lastLogs: val }));
  }

  updateLatestSpendings() {
    this.props.firebase
      .getLastSpendings(5)
      .then(val => this.setState({ lastSpendings: val }));
  }

  onLogInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ logInput: event.target.value });

  onSpendInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ spendInput: event.target.value });

  logOut = () => this.props.firebase.logOut();

  log = () => {
    if (this.state.logInput !== "") {
      this.props.firebase.addLog(this.state.logInput, 3);
      this.setState({
        logError: undefined,
        logInput: ""
      });
      this.updateCredits();
      this.updateLatestLogs();
    } else {
      this.setState({
        logError: "Please fill in the date of your logged hours!"
      });
    }
  };

  spend = () => {
    const spending = toNumber(this.state.spendInput);
    if (isInteger(spending) && spending <= this.state.availableCredits) {
      this.props.firebase.addSpending(spending);
      this.setState({
        spendError: undefined,
        spendInput: ""
      });
      this.updateCredits();
      this.updateLatestSpendings();
    } else {
      this.setState({
        spendError: "That's not right!"
      });
    }
  };

  render() {
    return (
      <div className="mainPage_container">
        <div className="mainPage_bar">
          <button onClick={this.logOut}>Log out</button>
        </div>
        <div className="mainPage_credits">
          <h1>Sticker credits: {this.state.availableCredits}</h1>
        </div>
        <div className="mainPage_logging">
          <div className="mainPage_logger">
            <input
              value={this.state.logInput}
              onChange={this.onLogInputChange}
            />
            <button onClick={this.log}>Claim my credits!</button>
            <div>
              <span>Latest logs:</span>
              {this.state.lastLogs.map((val, index) => (
                <span key={index}>{val}</span>
              ))}
            </div>
          </div>
          <div className="mainPage_spender">
            <input
              value={this.state.spendInput}
              onChange={this.onSpendInputChange}
            />
            <button onClick={this.spend}>Spend my credits!</button>
            <div>
              <span>Latest spending:</span>
              {this.state.lastSpendings.map((val, index) => (
                <span key={index}>{val}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
