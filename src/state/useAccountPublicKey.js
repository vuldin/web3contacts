import { useState } from "react";

export default function useAccountPublicKey() {
  const [accountPublicKey, setAccountPublicKey] = useState();

  return { accountPublicKey, setAccountPublicKey };
}
