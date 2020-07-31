import React from "react";
import store from "../state/store";
import Connect from "./Connect";
import Status from "./Status";
import LightningBolt from "../../svgs/lightning-bolt.svg";

export default function Navbar() {
  const { isConnected } = store.useStatus;

  return (
    <div className="flex p-2">
      <div className="flex items-center flex-none pl-32">
        <span className="font-light">Drasil</span>
        <LightningBolt className="w-4 h-4" />
        <span className="font-bold">Contacts</span>
      </div>
      <div className="flex-grow" />
      <div className="flex-none">{isConnected ? <Status /> : <Connect />}</div>
    </div>
  );
}
