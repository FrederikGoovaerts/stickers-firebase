import * as React from "react";
import { FirebaseWrapper } from "../firebase/main";

interface MainPageProps {
  firebase: FirebaseWrapper;
}

export const MainPage = (props: MainPageProps) => {
  const logOut = () => props.firebase.logOut();
  return (
    <div>
      <h1>Stickers</h1>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};
