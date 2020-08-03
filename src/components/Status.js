import React, { useEffect, useState } from "react";
import store from "../state/store";
import { SYNCED_TEXT, DESYNCED_TEXT } from "../constants";

export default function Status() {
  const { showSync, isBoxSyncing } = store.useStatus;
  const { profile } = store.use3Box;

  return (
    <>
      {profile?.image?.[0]?.contentUrl?.["/"] && (
        <img
          className="inline-block w-8 h-8 rounded"
          src={`https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl["/"]}`}
          alt="profile"
        />
      )}
      <span className="pl-2">{profile.name}</span>
      <span className="inline-block pl-2 text-sm text-gray-600">
        {showSync && (isBoxSyncing ? `${DESYNCED_TEXT}` : `${SYNCED_TEXT}`)}
      </span>
    </>
  );
}
