import React, { useEffect, useState } from "react";
import store from "../state/store";

export default function Profile() {
  const { accountPublicKey } = store.useAccountPublicKey;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getProfileInfo() {
      const profile = await Box.getProfile(accountPublicKey);
      setProfile(profile);
    }
    accountPublicKey ? getProfileInfo() : setProfile({});
  }, [accountPublicKey]);

  return (
    <div>
      <span>{profile.name}</span>
      <span>{profile.emoji}</span>
    </div>
  );
}
