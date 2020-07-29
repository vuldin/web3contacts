import React, { useEffect, useRef, useState } from "react";
import store from "../state/store";
import {
  CONNECTED_TEXT,
  DISCONNECTED_TEXT,
  SYNCED_TEXT,
  DESYNCED_TEXT,
} from "../constants";
import { sleep } from "../helpers";

export default function Status() {
  const [showSync, setShowSync] = useState(false);
  const firstRender = useRef(true);
  const { isConnected, isBoxSyncing } = store.useStatus;
  const { profile } = store.useProfile;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    async function updateSyncDisplay() {
      setShowSync(true);
      if (!isBoxSyncing) {
        await sleep(2000);
        setShowSync(false);
      }
    }

    updateSyncDisplay();
  }, [isBoxSyncing]);

  return (
    <div>
      <span>{profile.name && profile.name}</span>
      <span>{isConnected ? `${CONNECTED_TEXT}` : `${DISCONNECTED_TEXT}`}</span>
      <span>
        {showSync && (isBoxSyncing ? `${DESYNCED_TEXT}` : `${SYNCED_TEXT}`)}
      </span>
    </div>
  );
}
