import React, { useEffect } from "react";
import store from "../state/store";
import { CONNECT_TEXT } from "../constants";

export default function Connect() {
  const { accountPublicKey, setAccountPublicKey } = store.useAccountPublicKey;
  const {
    spaceName,
    setIsBoxSyncing,
    isConnected,
    setIsConnected,
  } = store.useStatus;
  const { box } = store.useBox;
  const { space } = store.useSpace;

  useEffect(() => {
    async function setBoxAndSpace() {
      if (!box.current) {
        setIsBoxSyncing(true);
        box.current = await Box.create(window.ethereum);
        await box.current.auth([spaceName], { address: accountPublicKey });
        space.current = await box.current.openSpace(spaceName);
        await box.current.syncDone;
        setIsBoxSyncing(false);
      }
    }

    function handleNewAccounts(newAccounts) {
      setAccountPublicKey(newAccounts[0]);
    }

    if (accountPublicKey) {
      setBoxAndSpace();
      setIsConnected(true);
    } else {
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

  return (
    <>
      {!isConnected && (
        <button
          className="bg-orange-700 hover:bg-orange-800 font-bold py-1 px-4 rounded mr-32"
          onClick={connectOnClick}
        >
          {CONNECT_TEXT}
        </button>
      )}
    </>
  );
}
