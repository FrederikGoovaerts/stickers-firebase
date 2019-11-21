import * as React from "react";

interface LandingPageProps {
  logIn: () => void;
}

export const LandingPage = (props: LandingPageProps) => (
  <div className="landingPage_container">
    <button className="landingPage_loginButton" onClick={props.logIn}>
      Log in
    </button>
  </div>
);
