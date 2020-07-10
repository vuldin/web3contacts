import React from "react";
import { render } from "react-dom";
import store from "./state/store";
import useAccounts from "./state/useAccounts";
import useProfile from "./state/useProfile";
import OnboardingButton from "./components/OnboardingButton";
import Profile from "./components/Profile";

function App() {
  store.useAccounts = useAccounts();
  store.useProfile = useProfile();

  return (
    <div>
      <OnboardingButton />
      <Profile />
    </div>
  );
}

render(<App />, document.getElementById("app"));
