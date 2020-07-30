import React from "react";
import store from "./state/store";
import useAccountPublicKey from "./state/useAccountPublicKey";
import useBox from "./state/useBox";
import useProfile from "./state/useProfile";
import useSpace from "./state/useSpace";
import useStatus from "./state/useStatus";
import Navbar from "./components/Navbar";
import ContactInfo from "./components/ContactInfo";

export default function App() {
  store.useAccountPublicKey = useAccountPublicKey();
  store.useBox = useBox();
  store.useSpace = useSpace();
  store.useStatus = useStatus();
  store.useProfile = useProfile();

  return (
    <>
      <Navbar />
      <ContactInfo />
    </>
  );
}
