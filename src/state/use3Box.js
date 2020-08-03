import { useEffect, useRef, useState } from "react";
import store from "../state/store";

export default function use3Box() {
  const [profile, setProfile] = useState({});
  const box = useRef();
  const space = useRef();
  const { accountPublicKey, setAccountPublicKey } = store.useAccountPublicKey;
  const {
    setIsBoxSyncing,
    setIsInitialSyncComplete,
    setIsConnected,
  } = store.useStatus;
  const spaceName = "drasil-contacts";

  useEffect(() => {
    async function setBoxAndSpace() {
      if (!box.current) {
        setIsBoxSyncing(true);
        box.current = await Box.create(window.ethereum);
        await box.current.auth([spaceName], { address: accountPublicKey });
        space.current = await box.current.openSpace(spaceName);
        await box.current.syncDone;
        setIsBoxSyncing(false);
        setIsInitialSyncComplete(true);
      }
    }

    async function getProfile() {
      const profile = await Box.getProfile(accountPublicKey);
      setProfile(profile);
    }

    function handleNewAccounts(newAccounts) {
      setAccountPublicKey(newAccounts[0]);
    }

    if (accountPublicKey) {
      setBoxAndSpace();
      getProfile();
      setIsConnected(true);
    } else {
      setIsConnected(false);
      setProfile({});
    }

    window.ethereum.on("accountsChanged", handleNewAccounts);
    return () => {
      window.ethereum.off("accountsChanged", handleNewAccounts);
    };
  }, [accountPublicKey]);

  return { box, profile, space };
}
