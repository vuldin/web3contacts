import React, { useEffect, useState } from "react";
import store from "../state/store";
import { SYNCED_TEXT, DESYNCED_TEXT } from "../constants";
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
      <span className="inline-block w-32 pl-2 text-sm text-gray-600">
        {showSync && (isBoxSyncing ? `${DESYNCED_TEXT}` : `${SYNCED_TEXT}`)}
      </span>
      {profile?.image?.[0]?.contentUrl?.["/"] && (
        <img
          className="inline-block w-8 h-8 rounded"
          src={`https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl["/"]}`}
          alt="profile"
        />
      )}
    </div>
  );
}
