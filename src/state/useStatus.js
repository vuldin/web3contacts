import { useEffect, useState } from "react";
import { sleep } from "../helpers";

export default function useStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isBoxSyncing, setIsBoxSyncing] = useState(false);
  const [isInitialSyncComplete, setIsInitialSyncComplete] = useState(false);
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    async function updateSyncDisplay() {
      setShowSync(true);
      if (!isBoxSyncing) {
        await sleep(2000);
        setShowSync(false);
      }
    }

    updateSyncDisplay();
  }, [isBoxSyncing]);

  return {
    isConnected,
    setIsConnected,
    isBoxSyncing,
    setIsBoxSyncing,
    isInitialSyncComplete,
    setIsInitialSyncComplete,
    showSync,
    setShowSync,
  };
}
