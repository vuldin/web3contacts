import { useState } from "react";

export default function useAccounts() {
  const [accounts, setAccounts] = useState([]);

  return { accounts, setAccounts };
}
