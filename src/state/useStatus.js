import { useState } from "react";

export default function useStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const spaceName = "drasil-contacts";
  const [isBoxSyncing, setIsBoxSyncing] = useState(false);
  const [isInitialSyncComplete, setIsInitialSyncComplete] = useState(false);

  return {
    isConnected,
    setIsConnected,
    spaceName,
    isBoxSyncing,
    setIsBoxSyncing,
    isInitialSyncComplete,
    setIsInitialSyncComplete,
  };
}
