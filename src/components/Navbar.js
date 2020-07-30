import React from "react";
import store from "../state/store";
import Connect from "./Connect";
import Status from "./Status";
import LightningBolt from "../../svgs/lightning-bolt.svg";

export default function Navbar() {
  const { isConnected } = store.useStatus;

  return (
    <div className="p-2 flex">
      <div className="flex-none flex items-center pl-32">
        <span className="font-light">Drasil</span>
        <LightningBolt className="h-4 w-4" />
        <span className="font-bold">Contacts</span>
      </div>
      <div className="flex-grow" />
      <div className="flex-none">{isConnected ? <Status /> : <Connect />}</div>
    </div>
  );
}
