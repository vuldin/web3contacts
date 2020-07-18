import React from "react";
import store from "./state/store";
import useAccountPublicKey from "./state/useAccountPublicKey";
import useBox from "./state/useBox";
import useSpace from "./state/useSpace";
import OnboardingButton from "./components/OnboardingButton";
import Connect from "./components/Connect";
import Profile from "./components/Profile";
import ContactInfo from "./components/ContactInfo";

export default function App() {
  store.useAccountPublicKey = useAccountPublicKey();
  store.useBox = useBox();
  store.useSpace = useSpace();

  return (
    <>
      {/*
      <OnboardingButton />
       */}
      <Connect />
      <Profile />
      {/*
      <ContactInfo />
      */}
    </>
  );
}
