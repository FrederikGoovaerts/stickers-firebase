import * as React from "react";

interface LandingPageProps {
  logIn: () => void;
}

export const LandingPage = (props: LandingPageProps) => (
  <div className="landing_page__container">
    <button className="landing_page__login_button" onClick={props.logIn}>
      Log in
    </button>
  </div>
);
