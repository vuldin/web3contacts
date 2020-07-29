import { useState } from "react";

export default function useStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const spaceName = "web3contacts";
  const [isBoxSyncing, setIsBoxSyncing] = useState(false);

  return {
    isConnected,
    setIsConnected,
    spaceName,
    isBoxSyncing,
    setIsBoxSyncing,
  };
}
