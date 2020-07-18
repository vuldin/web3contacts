import React, { useEffect, useState } from "react";
import store from "../state/store";
import { sleep } from "../helpers";
import {
  CONNECT_TEXT,
  DISCONNECT_TEXT,
  CONNECTED_TEXT,
  DISCONNECTED_TEXT,
  SYNCED_TEXT,
  DESYNCED_TEXT,
} from "../constants";

export default function Connect() {
  const [buttonText, setButtonText] = useState(CONNECT_TEXT);
  const [isConnected, setIsConnected] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [showSync, setShowSync] = useState(false);

  const { accountPublicKey, setAccountPublicKey } = store.useAccountPublicKey;
  const { box } = store.useBox;
  const { space } = store.useSpace;

  // TODO unable to open this space on 3box
  async function setBoxAndSpace() {
    if (!box.current) {
      setIsSynced(false);
      setShowSync(true);
      const spaceName = "io-textile-dropzone";
      box.current = await Box.create(window.ethereum);
      await box.current.auth([spaceName], { address: accountPublicKey });
      space.current = await box.current.openSpace(spaceName);
      // TODO only call syncDone once in app lifecycle?
      await box.current.syncDone;
      setIsSynced(true);
      await sleep(2000);
      setShowSync(false);
    }
  }

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      console.log("handleNewAccounts");
      setAccountPublicKey(newAccounts[0]);
    }

    if (accountPublicKey) {
      setBoxAndSpace();
      setButtonText(DISCONNECT_TEXT);
      setIsConnected(true);
    } else {
      // TODO how do you disconnect your dapp? clearing box/space sometimes causes errors
      //box.current = null;
      //space.current = null;
      setButtonText(CONNECT_TEXT);
      setIsConnected(false);
    }

    window.ethereum.on("accountsChanged", handleNewAccounts);
    return () => {
      window.ethereum.off("accountsChanged", handleNewAccounts);
    };
  }, [accountPublicKey]);

  function connectOnClick() {
    window.ethereum
      ?.request({ method: "eth_requestAccounts" })
      .then((newAccounts) => setAccountPublicKey(newAccounts[0]));
  }

  function disconnectOnClick() {
    setAccountPublicKey();
    setIsConnected(false);
    window.ethereum.off("accountsChanged", (newAccounts) =>
      setAccountPublicKey(newAccounts[0])
    );
  }

  return (
    <>
      <button onClick={isConnected ? disconnectOnClick : connectOnClick}>
        {buttonText}
      </button>
      <span>{isConnected ? CONNECTED_TEXT : DISCONNECTED_TEXT}</span>
      {showSync ? (
        <>
          <span> | </span>
          <span>{isSynced ? SYNCED_TEXT : DESYNCED_TEXT}</span>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
