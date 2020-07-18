import MetaMaskOnboarding from "@metamask/onboarding";
import React, { useEffect, useRef, useState } from "react";
import store from "../state/store";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const DISCONNECT_TEXT = "Disconnect";
const CONNECTED_TEXT = "Connected";
const DISCONNECTED_TEXT = "Disconnected";

export default function OnboardingButton() {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isConnected, setIsConnected] = useState(false);

  const { accountPublicKey, setAccountPublicKey } = store.useAccountPublicKey;

  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accountPublicKey) {
        setButtonText(DISCONNECT_TEXT);
        setIsConnected(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setIsConnected(false);
      }
    }
  }, [accountPublicKey]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccountPublicKey(newAccounts[0]);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  function connectOnClick() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => setAccountPublicKey(newAccounts[0]));
    } else {
      onboarding.current.startOnboarding();
    }
  }

  function disconnectOnClick() {
    setAccountPublicKey();
    setIsConnected(false);
  }

  return (
    <>
      <button onClick={isConnected ? disconnectOnClick : connectOnClick}>
        {buttonText}
      </button>
      <span>{isConnected ? CONNECTED_TEXT : DISCONNECTED_TEXT}</span>
    </>
  );
}
