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
  const { isBoxSyncing } = store.useStatus;
  const { profile } = store.useProfile;

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

  return (
    <div>
      <span>{profile.name && `Hi ${profile.name}!`}</span>
      <span className="text-sm text-gray-600 pl-2 inline-block w-32">
        {showSync && (isBoxSyncing ? `${DESYNCED_TEXT}` : `${SYNCED_TEXT}`)}
      </span>
    </div>
  );
}
