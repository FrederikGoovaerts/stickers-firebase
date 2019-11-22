import * as React from "react";
import "./LandingPage.scss";

interface LandingPageProps {
  logIn: () => void;
}

export const LandingPage = (props: LandingPageProps) => (
  <div className="landingPage_container">
    <div className="main">
      <h1>Stickers</h1>
      <button className="loginButton" onClick={props.logIn}>
        Log in
      </button>
    </div>
    <div className="spacing" />
  </div>
);
