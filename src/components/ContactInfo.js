import React, { useEffect, useState } from "react";
import { Client } from "@textile/hub";
import { Libp2pCryptoIdentity } from "@textile/threads-core";
import store from "../state/store";

export default function ContactInfo() {
  const [threads, setThreads] = useState([]);
  const { accountPublicKey } = store.useAccountPublicKey;

  async function createClient() {
    const keyInfo = {
      key: "b6w5cexcus6yieedpxwzltv2ode",
      secret: "",
    };

    const client = await Client.withKeyInfo(keyInfo);
    return client;
  }

  async function getIdentity() {
    const box = await Box.create(window.ethereum);
    const [address] = await window.ethereum.enable();
    await box.auth([], { address });
    const space = await box.openSpace("io-textile-dropzone");
    await box.syncDone;
    try {
      var storedIdent = await space.private.get("identity");
      if (storedIdent === null) {
        throw new Error("No identity");
      }
      const identity = await Libp2pCryptoIdentity.fromString(storedIdent);
      return identity;
    } catch (e) {
      const identity = await Libp2pCryptoIdentity.fromRandom();
      const identityString = identity.toString();
      try {
        await space.private.set("identity", identityString);
      } catch (e) {
        console.error("set space private failed");
        console.error(e);
      }
      return identity;
    }
  }

  useEffect(() => {
    async function init() {
      const client = await createClient();
      const identity = await getIdentity();
      await client.getToken(identity);
      const { listList: threads } = await client.listThreads();
      setThreads(threads);
    }

    if (accountPublicKey) {
      init();
    }
  }, [accountPublicKey]);

  useEffect(() => {
    if (threads.length > 0) {
      console.log("threads", threads);
    }
  });

  return <div>contact info</div>;
}
