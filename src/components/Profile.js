import React, { useEffect } from "react";
import { getProfile } from "3box/lib/api";
import store from "../state/store";

export default function Profile() {
  const { accounts } = store.useAccounts;
  const { profile, setProfile } = store.useProfile;

  async function getProfileInfo() {
    const profile = await getProfile(accounts[0]);
    setProfile(profile);
  }

  useEffect(() => {
    if (accounts.length > 0) {
      getProfileInfo();
    }
  }, [accounts]);

  /*
    const box = await Box.openBox(accounts[0], window.ethereum);
    const space = box.openSpace("shade");
    setBox(box);
    setSpace(space);
    */

  /*
{
 "image": [
  {
   "@type": "ImageObject",
   "contentUrl": {
    "/": "QmRX5ic5aC3PywDW25zXii6rd2Rsba7FzzKaNLNUrQ28cN"
   }
  }
 ],
 "emoji": "🤯",
 "name": "Vuldin",
 "proof_github": "https://gist.githubusercontent.com/vuldin/79a606536a3f78b335088fc271bfab19/raw/9912552a74457426064fe182e015095818c7f454/gistfile1.txt",
 "memberSince": "Mon Feb 24 2020 22:46:18 GMT-0500 (Eastern Standard Time)",
 "proof_did": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE1ODI2MDIzODIsImlzcyI6ImRpZDozOmJhZnlyZWlkdmZ2bG12YXZnN3hwN3pram5sYXpnNTZ6ams0a3kyZXZsaWx5N2c2azRyMmRyem9vN3V1In0.qnmGK2IWiGIEFVKaiICYKcTY95yobJCIBIYJQTiU90WtFwwWqeVadkgZsZIFJFAguTJ6gQcl-QSJe4rahqy-mg"
}
    */
  return (
    <div>
      <span>{profile.name}</span>
      <span>{profile.emoji}</span>
    </div>
  );
}
