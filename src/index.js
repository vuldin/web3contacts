import React from "react";
import { render } from "react-dom";
import store from "./state/store";
import useAccountPublicKey from "./state/useAccountPublicKey";
import OnboardingButton from "./components/OnboardingButton";
import Profile from "./components/Profile";
import ContactInfo from "./components/ContactInfo";

function App() {
  store.useAccountPublicKey = useAccountPublicKey();

  return (
    <>
      <OnboardingButton />
      <Profile />
      <ContactInfo />
    </>
  );
}

render(<App />, document.getElementById("app"));
