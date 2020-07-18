import React, { useEffect, useState } from "react";
import { Client, ThreadID } from "@textile/hub";
// TODO replace with client.randomIdentity()
import { Libp2pCryptoIdentity } from "@textile/threads-core";
import store from "../state/store";

export default function ContactInfo() {
  const { accountPublicKey } = store.useAccountPublicKey;

  async function createClient() {
    const keyInfo = {
      key: "b6w5cexcus6yieedpxwzltv2ode",
      secret: "",
    };

    const client = await Client.withKeyInfo(keyInfo);
    return client;
  }

  // TODO unable to open this space on 3box, which may signal some issue
  async function getSpace() {
    const spaceName = "io-textile-dropzone";
    const box = await Box.create(window.ethereum);
    const [address] = await window.ethereum.enable();
    await box.auth([spaceName], { address });
    const space = await box.openSpace(spaceName);
    await box.syncDone;
    return space;
  }

  async function getIdentity(space) {
    try {
      const storedIdent = await space.private.get("identity");
      if (storedIdent === null) {
        throw new Error("No identity");
      }
      // TODO replace with client.randomIdentity()
      // https://textileio.github.io/js-hub/docs/hub.client.randomidentity
      const identity = await Libp2pCryptoIdentity.fromString(storedIdent);
      return identity;
    } catch (e) {
      // TODO replace with client.randomIdentity()
      const identity = await Libp2pCryptoIdentity.fromRandom();
      await space.private.set("identity", identity.toString());
      return identity;
    }
  }

  async function getThreadId(space, client) {
    try {
      console.log("finding stored thread");
      const storedThreadId = await space.private.get("threadId");
      if (storedThreadId === null) {
        console.log("stored thread not found");
        throw new Error("No threadId");
      }
      console.log("stored thread found");
      return ThreadID.fromString(storedThreadId);
    } catch (e) {
      console.log("generating new thread");
      const threadId = ThreadID.fromRandom();
      // TODO verify newDB only needs to be called once when we have a new threadId
      /*
      await Promise.all([
        space.private.set("threadId", threadId.toString()),
        client.newDB(threadId),
      ]);
      */
      return threadId;
    }
  }

  async function getDb(client, threadId) {
    const dbInfo = await client.getDBInfo(threadId);
    console.log(dbInfo);
  }

  async function getContactInfo(threadId, client) {
    const contactInfoSchema = {
      $id: "https://vuld.in/contactinfo.schema.json",
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "contactInfo",
      type: "object",
      required: ["_id"],
      properties: {
        _id: {
          type: "string",
        },
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
      },
    };

    const { collections } = client;
    console.log("attempting to get existing ContactInfo...");
    // TODO never finds existing collection...
    const existingContactInfo = collections?.get("ContactInfo");
    if (existingContactInfo) {
      console.log("found");
      return existingContactInfo;
    } else {
      console.log("not found, creating new ContactInfo");
      let newContactInfo;
      try {
        newContactInfo = await client.newCollection(
          threadId,
          "ContactInfo",
          contactInfoSchema
        );
        return newContactInfo;
      } catch (e) {
        console.error("failed generating new ContactInfo");
        console.error(e);
      }
    }
  }

  useEffect(() => {
    async function init() {
      const client = await createClient();
      const space = await getSpace();
      const identity = await getIdentity(space);
      await client.getToken(identity);

      const threadId = await getThreadId(space, client);
      console.log("threadId", threadId);
      //await getDb(client, threadId);
      const dbInfo = await client.getDBInfo(threadId);

      /*
      //await client.newDB(threadId);
      const ContactInfo = await getContactInfo(threadId, client);
      console.log(ContactInfo);

      // TODO array never has more than one entry, in spite of me reloading app without clearing collection
      // must be related to never finding the collection
      const ids = await client.create(threadId, "ContactInfo", [
        {
          firstName: "josh",
          lastName: "purcell",
        },
      ]);
      console.log("ids", ids);
      const { listList: threads } = await client.listThreads();
      console.log(threads);
      */
    }

    if (accountPublicKey) {
      init();
    }
  }, [accountPublicKey]);

  return <div>contact info</div>;
}
